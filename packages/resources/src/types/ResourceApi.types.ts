import { Core } from '@minddrop/core';
import {
  ResourceDocument,
  ResourceDocumentMap,
  RDData,
} from './ResourceDocument.types';
import { ResourceDocumentFilters } from './ResourceDocumentFilters.types';

/**
 * The API for a resource.
 *
 * @param TData The resource's custom data.
 * @param TCreateData The data that can be supplied to the `create` method when creating a new resource document. Should be a subset of `TData`.
 * @param TUpdateData The data that can be supplied to the `update` method when updating a resource document. Should be a subset of `TData`.
 */
export interface ResourceApi<
  TData extends RDData,
  TCreateData extends Partial<Record<keyof TData, any>> & RDData,
  TUpdateData extends Partial<Record<keyof TData, any>> & RDData,
  TResourceDocument extends ResourceDocument<TData> = ResourceDocument<TData>,
> {
  /**
   * The resource identifier.
   */
  resource: string;

  /**
   * Creates a new resource document and dispatches a `[resource]:create`
   * event. The document is validated before creation. Returns the new
   * document.
   *
   * - Throws a `ResourceDocumentValidationError` if the resulting
   * document is invalid.
   *
   * @param core A MindDrop core instance.
   * @param data The data required to create a document.
   * @returns The new resource document.
   */
  create(core: Core, data: TCreateData): TResourceDocument;

  /**
   * Updates a resource document and dispatches a `[resource]:update`
   * event. The document is validated before being updated. Returns
   * the updated document.
   *
   * - Throws a `ResourceDocumentNotFoundError` if the document does
   *   not exist.
   * - Throws a `ResourceDocumentValidationError` if the resulting
   *   document is invalid.
   *
   * @param core A MindDrop core instance.
   * @param documentId The ID of the document to update.
   * @param data The data required to create a document.
   * @returns The update resource document.
   */
  update(core: Core, documentId: string, data: TUpdateData): TResourceDocument;

  /**
   * Soft-deletes a resource document and dispatches a
   * `[resource]:delete` event. Returns the deleted document.
   *
   * Deleted documents can be restored using the `restore` method.
   *
   * - Throws a `ResourceDocumentNotFoundError` if the document does
   *   not exist.
   *
   * @param core A MindDrop core instance.
   * @param documentId The ID of the document to delete.
   */
  delete(core: Core, documentId: string): TResourceDocument;

  /**
   * Restores a soft-deleted resource document and dispatches a
   * `[resource]:restore` event. Returns the restored document.
   *
   * Deleted documents can be restored using the `restore` method.
   *
   * - Throws a `ResourceDocumentNotFoundError` if the document does
   *   not exist.
   *
   * @param core A MindDrop core instance.
   * @param documentId The ID of the document to restore.
   */
  restore(core: Core, documentId: string): TResourceDocument;

  /**
   * Permanently deletes a resource document and dispatches a
   * `[resource]:delete-permanently` event. Returns the deleted
   * document.
   *
   * Permanently deleted documents cannot be restored.
   *
   * - Throws a `ResourceDocumentNotFoundError` if the document does
   *   not exist.
   *
   * @param core A MindDrop core instance.
   * @param documentId The ID of the document to delete permanently.
   */
  deletePermanently(core: Core, documentId: string): TResourceDocument;

  /**
   * Retrieves one or more resource documents by ID.
   *
   * If provided a single ID, returns the requested document.
   * If provided an array of IDs, retrieves a
   * `{ [id]: ResourceDocument }` map of the requested documents.
   *
   * - Throws a `ResourceDocumentNotFoundError` if any of the
   *   requested documents do not exist.
   *
   * @param documentId The ID(s) of the document to retrieve.
   * @returns The requested document(s).
   */
  get(documentId: string): TResourceDocument;
  get(documentIds: string[]): Record<string, TResourceDocument>;

  /**
   * Returns a `{ [id]: ResourceDocument }` map containing all of
   * the resource documents.
   *
   * @returns All of the resource documents.
   */
  getAll(): Record<string, TResourceDocument>;

  filter(
    documents: ResourceDocumentMap<TResourceDocument>,
    filters: ResourceDocumentFilters,
  ): ResourceDocumentMap<TResourceDocument>;

  hooks: {
    /*
     * Returns a resource document by ID or `null`
     * if it does not exist.
     */
    useDocument(documentId: string): TResourceDocument;
  };

  /**
   * Store methods work directly on the resource's document store.
   * They are intended for use only by storage adapters and in
   * tests.
   */
  store: ResourceStoreApi<TResourceDocument>;
}

export interface ResourceStoreApi<TResourceDocument> {
  /**
   * Retrieves one or more resource documents by ID, bypassing the
   * resource's `onGet` callback.
   *
   * If provided a single ID, returns the requested document or
   * `undefined` if the document does not exist.
   * If provided an array of IDs, retrieves a
   * `{ [id]: ResourceDocument | undefined }` map of the requested
   * documents (undefined if a document does not exist).
   *
   * @param documentId The ID(s) of the document to retrieve.
   * @returns The requested document(s).
   */
  get(documentId: string): TResourceDocument;
  get(documentIds: string[]): Record<string, TResourceDocument>;

  /**
   * Returns a `{ [id]: ResourceDocument }` map containing all of
   * the resource documents, bypassing the resource's `onGet`
   * callback.
   *
   * @returns All of the resource documents.
   */
  getAll(): Record<string, TResourceDocument>;

  /**
   * Adds a resource document directly into the store, bypassing
   * validation and the resource's `onCreate` callback. Dispatches
   * a `[resource]:add` event.
   *
   * Intended for storage adapters to add remotly created documents
   * into the local store.
   *
   * @param core A MindDrop core instance.
   * @param document The document to add to the store.
   */
  add(core: Core, document: TResourceDocument): void;

  /**
   * Sets a resource document directly into the store, bypassing
   * validation and the resource's `onUpdate` callback. Dispatches
   * a `[resource]:set` event.
   *
   * Intended for storage adapters to set remotly updated document
   * changes into the local store.
   *
   * @param core A MindDrop core instance.
   * @param document The document to set in the store.
   */
  set(core: Core, document: TResourceDocument): void;

  /**
   * Removes a resource document directly from the store, and
   * dispatches a `[resource]:remove` event.
   *
   * Intended for storage adapters to remove a document which was
   * permanently deleted remotly from the local store.
   *
   * @param core A MindDrop core instance.
   * @param document The document to remove from the store.
   */
  remove(core: Core, documentId: string): void;

  /**
   * Loads resource documents directly into the store and
   * dispatches a `[resource]:load` event.
   *
   * Intended for storage adapters to load the initial data into
   * the store.
   *
   * @param core A MindDrop core instance.
   * @param documents The documents to load.
   */
  load(core: Core, documents: TResourceDocument[]): void;

  /**
   * Clears all resource documents from the store.
   *
   * **Intended for use in tests only.**
   */
  clear(): void;
}
