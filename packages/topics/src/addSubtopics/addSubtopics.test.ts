import { addSubtopics } from './addSubtopics';
import {
  cleanup,
  core,
  setup,
  tNoDrops,
  tSixDrops,
  tTwoDrops,
} from '../test-utils';
import { getTopic } from '../getTopic';
import { contains } from '@minddrop/utils';
import { getTopics } from '../getTopics';

describe('addSubtopics', () => {
  beforeEach(setup);

  afterEach(cleanup);

  it('adds subtopics to the topic', () => {
    // Add the subtopics
    addSubtopics(core, tNoDrops.id, [tTwoDrops.id, tSixDrops.id]);

    // Get the updated topic
    const topic = getTopic(tNoDrops.id);

    // Should have added subtopics
    expect(
      contains(topic.subtopics, [tTwoDrops.id, tSixDrops.id]),
    ).toBeTruthy();
  });

  it('returns the updated topic', () => {
    // Add a subtopic
    const result = addSubtopics(core, tNoDrops.id, [tTwoDrops.id]);

    // Get the updated topic
    const topic = getTopic(tNoDrops.id);

    // Returned value should equal updated topic
    expect(result).toEqual(topic);
  });

  it('adds the topic as a parent on the subtopics', () => {
    // Add a subtopic
    addSubtopics(core, tNoDrops.id, [tTwoDrops.id]);

    // Get the updated subtopic
    const subtopic = getTopic(tTwoDrops.id);

    // Should have topic as a parent
    expect(
      contains(subtopic.parents, [{ type: 'topic', id: tNoDrops.id }]),
    ).toBeTruthy();
  });

  it("dispatches a 'topics:add-subtopics' event", (done) => {
    // Listen to 'topics:add-subtopics' events
    core.addEventListener('topics:add-subtopics', (payload) => {
      // Get the updated topic
      const topic = getTopic(tNoDrops.id);
      // Get the updated added subtopics
      const subtopics = getTopics([tTwoDrops.id, tSixDrops.id]);

      // Payload data should contain updated topic
      expect(payload.data.topic).toEqual(topic);
      // Payload should contain updated subtopics
      expect(payload.data.subtopics).toEqual(subtopics);
      done();
    });

    // Add the subtopics
    addSubtopics(core, tNoDrops.id, [tTwoDrops.id, tSixDrops.id]);
  });
});
