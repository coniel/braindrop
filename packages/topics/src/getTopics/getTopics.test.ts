import { act, renderHook } from '@minddrop/test-utils';
import { getTopics } from './getTopics';
import { useTopicsStore } from '../useTopicsStore';
import { generateTopic } from '../generateTopic';
import { TopicNotFoundError } from '../errors';

describe('getTopics', () => {
  afterEach(() => {
    const { result } = renderHook(() => useTopicsStore());

    act(() => {
      result.current.clear();
    });
  });

  it('returns the topics matching the ids', () => {
    const { result } = renderHook(() => useTopicsStore());

    const topic1 = generateTopic();
    const topic2 = generateTopic();
    const topic3 = generateTopic();

    act(() => {
      result.current.addTopic(topic1);
      result.current.addTopic(topic2);
      result.current.addTopic(topic3);
    });

    const topics = getTopics([topic1.id, topic2.id]);

    expect(Object.keys(topics).length).toBe(2);
    expect(topics[topic1.id]).toEqual(topic1);
    expect(topics[topic2.id]).toEqual(topic2);
  });

  it('filters topics', () => {
    const { result: store } = renderHook(() =>
      useTopicsStore((state) => state),
    );
    const topic1 = generateTopic();
    const topic2 = {
      ...generateTopic(),
      archived: true,
      archivedAt: new Date(),
    };
    const topic3 = { ...generateTopic(), deleted: true, deletedAt: new Date() };

    act(() => {
      store.current.loadTopics([topic1, topic2, topic3]);
    });

    const { result } = renderHook(() =>
      getTopics([topic1.id, topic2.id, topic3.id], { deleted: true }),
    );

    expect(result.current[topic1.id]).not.toBeDefined();
    expect(result.current[topic2.id]).not.toBeDefined();
    expect(result.current[topic3.id]).toEqual(topic3);
  });

  it('throws a TopicNotFoundError if the topic does not exist', () => {
    expect(() => getTopics(['id'])).toThrowError(TopicNotFoundError);
  });
});
