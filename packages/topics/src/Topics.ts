import { TopicsApi } from './types';
import { get } from './get';
import { getAllTopics } from './getAllTopics';
import { getTopicParents } from './getTopicParents';
import { getDropParents } from './getDropParents';
import { filterTopics } from './filterTopics';
import { createTopic } from './createTopic';
import { updateTopic } from './updateTopic';
import { addSubtopics } from './addSubtopics';
import { removeSubtopics } from './removeSubtopics';
import { addDropsToTopic } from './addDropsToTopic';
import { removeDropsFromTopic } from './removeDropsFromTopic';
import { addTagsToTopic } from './addTagsToTopic';
import { removeTagsFromTopic } from './removeTagsFromTopic';
import { archiveTopic } from './archiveTopic';
import { deleteTopic } from './deleteTopic';
import { restoreTopic } from './restoreTopic';
import { deleteTopicPermanently } from './deleteTopicPermanently';
import { insertData } from './insertData';
import { loadTopics } from './loadTopics';
import { clearTopics } from './clearTopics';
import { registerTopicView } from './registerTopicView';
import { unregisterTopicView } from './unregisterTopicView';
import { getTopicView } from './getTopicView';
import { getTopicViews } from './getTopicViews';
import { createTopicViewInstance } from './createTopicViewInstance';
import { deleteTopicViewInstance } from './deleteTopicViewInstance';

export const Topics: TopicsApi = {
  get,
  getAll: getAllTopics,
  parents: getTopicParents,
  dropParents: getDropParents,
  filter: filterTopics,
  create: createTopic,
  update: updateTopic,
  addSubtopics,
  removeSubtopics,
  addDrops: addDropsToTopic,
  removeDrops: removeDropsFromTopic,
  addTags: addTagsToTopic,
  removeTags: removeTagsFromTopic,
  archive: archiveTopic,
  delete: deleteTopic,
  restore: restoreTopic,
  deletePermanently: deleteTopicPermanently,
  getView: getTopicView,
  getViews: getTopicViews,
  registerView: registerTopicView,
  unregisterView: unregisterTopicView,
  createViewInstance: createTopicViewInstance,
  deleteViewInstance: deleteTopicViewInstance,
  insertData,
  load: loadTopics,
  clear: clearTopics,
  addEventListener: (core, event, callback) =>
    core.addEventListener(event, callback),
  removeEventListener: (core, event, callback) =>
    core.removeEventListener(event, callback),
};
