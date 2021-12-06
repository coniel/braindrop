import { initializeCore } from '@minddrop/core';
import { act } from '@minddrop/test-utils';
import { onDisable, onRun } from '../extension';
import { createTopic } from '../createTopic';
import { Topic } from '../types';
import { removeSubtopics } from './removeSubtopics';
import { addSubtopics } from '../addSubtopics';

let core = initializeCore('topics');

// Set up extension
onRun(core);

describe('removeSubtopics', () => {
  afterEach(() => {
    // Reset extension
    onDisable(core);
    core = initializeCore('topics');
    onRun(core);
  });

  it('removes subtopics from the topic', () => {
    let topic: Topic;
    let subtopic1: Topic;
    let subtopic2: Topic;
    let subtopic3: Topic;

    act(() => {
      topic = createTopic(core);
      subtopic1 = createTopic(core);
      subtopic2 = createTopic(core);
      subtopic3 = createTopic(core);
      addSubtopics(core, topic.id, [subtopic1.id, subtopic2.id, subtopic3.id]);
    });

    const updated = removeSubtopics(core, topic.id, [
      subtopic1.id,
      subtopic2.id,
    ]);

    expect(updated.subtopics.length).toBe(1);
    expect(updated.subtopics.includes(subtopic1.id)).toBe(false);
    expect(updated.subtopics.includes(subtopic2.id)).toBe(false);
    expect(updated.subtopics.includes(subtopic3.id)).toBe(true);
  });

  it("dispatches a 'topics:remove-subtopics' event", () => {
    const callback = jest.fn();
    let topic: Topic;
    let subtopic1: Topic;
    let subtopic2: Topic;
    let subtopic3: Topic;

    core.addEventListener('topics:remove-subtopics', callback);

    act(() => {
      topic = createTopic(core);
      subtopic1 = createTopic(core);
      subtopic2 = createTopic(core);
      subtopic3 = createTopic(core);
      addSubtopics(core, topic.id, [subtopic1.id, subtopic2.id, subtopic3.id]);
    });

    const updated = removeSubtopics(core, topic.id, [
      subtopic1.id,
      subtopic2.id,
    ]);

    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0].data).toMatchObject({
      topic: updated,
      subtopics: [subtopic1.id, subtopic2.id],
    });
  });
});
