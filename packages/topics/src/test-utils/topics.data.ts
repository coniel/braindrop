import { FileEntry } from '@minddrop/core';
import { Topic } from '../types';

export const Topic_1_2_1: Topic = {
  title: 'Topic 1.2.1',
  isDir: false,
  path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.2/Topic 1.2.1.md',
  subtopics: [],
};

export const Topic_1_1: Topic = {
  title: 'Topic 1.1',
  isDir: false,
  path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.1.md',
  subtopics: [],
};

export const Topic_1_2: Topic = {
  title: 'Topic 1.2',
  isDir: true,
  path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.2',
  subtopics: [Topic_1_2_1.path],
};

export const Topic_1: Topic = {
  title: 'Topic 1',
  isDir: true,
  path: '/Users/foo/Documents/minddrop/Topic 1',
  subtopics: [Topic_1_2.path, Topic_1_1.path],
};

export const Topic_2: Topic = {
  title: 'Topic 2',
  isDir: true,
  path: '/Users/foo/Documents/minddrop/Topic 2',
  subtopics: [],
};

export const Topic_Untitled: Topic = {
  title: 'Untitled',
  isDir: false,
  path: '/Users/foo/Documents/minddrop/Untitled.md',
  subtopics: [],
};

// Not included as a root or sub topic in topics
export const Topic_Untitled_1: Topic = {
  title: 'Untitled 1',
  isDir: false,
  path: '/Users/foo/Documents/minddrop/Untitled 1.md',
  subtopics: [],
};

export const topics = [
  Topic_1,
  Topic_1_2,
  Topic_1_2_1,
  Topic_1_1,
  Topic_2,
  Topic_Untitled,
  Topic_Untitled_1,
];

export const topicFiles: FileEntry[] = [
  {
    name: '.DS_Store',
    path: '/Users/foo/Documents/minddrop/.DS_Store',
  },
  {
    children: [
      {
        name: 'Topic 1.md',
        path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.md',
      },
      {
        name: '.DS_Store',
        path: '/Users/foo/Documents/minddrop/Topic 1/.DS_Store',
      },
      {
        children: [
          {
            name: 'Topic 1.2.md',
            path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.2/Topic 1.2.md',
          },
          {
            name: 'Topic 1.2.1.md',
            path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.2/Topic 1.2.1.md',
          },
        ],
        name: 'Topic 1.2',
        path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.2',
      },
      {
        name: 'Topic 1.1.md',
        path: '/Users/foo/Documents/minddrop/Topic 1/Topic 1.1.md',
      },
    ],
    name: 'Topic 1',
    path: '/Users/foo/Documents/minddrop/Topic 1',
  },
  {
    children: [
      {
        name: 'Topic 2.md',
        path: '/Users/foo/Documents/minddrop/Topic 2.md',
      },
    ],
    name: 'Topic 2',
    path: '/Users/foo/Documents/minddrop/Topic 2',
  },
  {
    name: 'Untitled.md',
    path: '/Users/foo/Documents/minddrop/Untitled.md',
  },
  {
    name: 'Untitled 1.md',
    path: '/Users/foo/Documents/minddrop/Untitled 1.md',
  },
];
