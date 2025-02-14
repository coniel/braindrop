import { Events } from '@minddrop/events';
import {
  FileNotFoundError,
  Fs,
  InvalidPathError,
  PathConflictError,
} from '@minddrop/file-system';
import { DocumentsStore } from '../DocumentsStore';
import { DocumentNotFoundError } from '../errors';
import { getDocument } from '../getDocument';
import { updateChildDocumentPaths } from '../updateChildDocumentPaths';
import { titleFromPath } from '../utils';

/**
 * Moves a document to a new parent directory. If the document is wrapped, its children
 * will also be moved.
 *
 * @param id - The ID of the document to move.
 * @param newParentPath - The path of the new parent directory.
 * @returns The new document path.
 *
 * @throws {DocumentNotFoundError} If the document does not exist.
 * @throws {FileNotFoundError} If the document file does not exist.
 * @throws {InvalidPathError} If the target parent directory does not exist or is not a directory.
 *
 */
export async function moveDocument(
  id: string,
  newParentPath: string,
): Promise<string> {
  // Get the document
  const document = getDocument(id);

  // Ensure that the document exists
  if (!document) {
    throw new DocumentNotFoundError(id);
  }

  const { path } = document;

  // The path to move
  const pathToMove = document?.wrapped ? Fs.parentDirPath(path) : path;
  // The wrapper dir path, or document path if not wrapped
  const movedPath = document?.wrapped
    ? Fs.concatPath(newParentPath, titleFromPath(path))
    : Fs.concatPath(newParentPath, Fs.fileNameFromPath(path));
  // The new document path
  const newPath = document?.wrapped
    ? Fs.concatPath(movedPath, Fs.fileNameFromPath(path))
    : movedPath;

  // Ensure that the document path exists
  if (!(await Fs.exists(pathToMove))) {
    throw new FileNotFoundError(document.path);
  }

  // Ensure target parent dir exists
  if (!(await Fs.exists(newParentPath))) {
    throw new InvalidPathError(newParentPath);
  }

  // Ensure target parent dir is a directory
  if (!(await Fs.isDirectory(newParentPath))) {
    throw new InvalidPathError(newParentPath);
  }

  // Ensure that a child document with the same name does not exist
  // in the target parent dir.
  if (await Fs.exists(movedPath)) {
    throw new PathConflictError(movedPath);
  }

  // Move the document file/dir
  await Fs.rename(pathToMove, movedPath);

  // Update the document path in the store
  DocumentsStore.getState().update(document.id, {
    path: newPath,
  });

  // If the document is wrapped, recursively update its children's paths
  if (document.wrapped) {
    updateChildDocumentPaths(document.path, newPath);
  }

  // Dispatch a 'documents:document:move' event
  Events.dispatch('documents:document:move', {
    from: path,
    to: newPath,
    document: getDocument(id),
  });

  return newPath;
}
