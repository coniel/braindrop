export { createDocument as create } from './createDocument';
export { deleteDocument as delete } from './deleteDocument';
export { getDocument as get } from './getDocument';
export { getDocumentByPath as getByPath } from './getDocumentByPath';
export { getDocumentFromPath as getFromPath } from './getDocumentFromPath';
export { getWrappedPath } from './getWrappedPath';
export { isWrapped } from './utils';
export { loadDocuments as load } from './loadDocuments';
export { moveDocument as move } from './moveDocument';
export { removeChildDocuments } from './removeChildDocuments';
export { renameDocument as rename } from './renameDocument';
export { setDocumentIcon as setIcon } from './setDocumentIcon';
export { updateDocument as update } from './updateDocument';
export { wrapDocument as wrap } from './wrapDocument';
export {
  registerDocumentViewTypeConfig as registerView,
  unregisterDocumentViewTypeConfig as unregisterView,
} from './DocumentViewTypeConfigsStore';
