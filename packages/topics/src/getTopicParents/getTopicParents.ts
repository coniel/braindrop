import { getTopic } from '../getTopic';
import { getTopics } from '../getTopics';
import { TopicFilters, TopicMap } from '../types';

/**
 * Returns an `{ [id]: Topic }` map of a given topic's parents. The results
 * can be filtered using TopicFilters.
 *
 * @param topicId The ID of the topic for which to retrieve the parents.
 * @param filters Filters to filter the parents by.
 * @returns A `{ [id]: Topic }` map of the topic's parents.
 */
export function getTopicParents(
  topicId: string,
  filters?: TopicFilters,
): TopicMap {
  // Get the topic
  const topic = getTopic(topicId);

  // Get the parent topic IDs
  const parentIds = topic.parents
    .filter((parent) => parent.type === 'topic')
    .map((parent) => parent.id);

  // Get the parent topics, with possible filters applied
  const parents = getTopics(parentIds, filters);

  return parents;
}
