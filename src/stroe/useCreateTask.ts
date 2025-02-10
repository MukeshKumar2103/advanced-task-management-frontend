import helpers from '@/helpers';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const { generats } = helpers;
const { generateUUID } = generats;

interface content {
  uniq_id: string;
  insert: string;
  attributes?: {
    uniq_id: string;
    block_id: string;
    table_col?: { width: string };
    table_col_color: string;
    table_row_color: string;
    table_cell_line?: {
      cell: string;
      colspan: string;
      row: string;
      rowspan: string;
    };
  };
}

interface Task {
  id?: number;
  name?: string;
  status?: string;
  content?: content[];
}

interface update {
  key: string;
  value: any;
}

interface addContent {
  value: any;
}

interface updateContent {
  id?: string;
  key?: string;
  value: any;
}

interface TaskStore {
  task: Task;
  update: ({ key, value }: update) => void;
  addContent: ({ value }: addContent) => void;
  updateContent: ({ id, key, value }: updateContent) => void;
}

const courseStore = (set: any): TaskStore => ({
  task: {},
  update: ({ key, value }: update) => {
    set((state: TaskStore) => ({
      ...state,
      task: { ...state.task, [key]: value },
    }));
  },
  addContent: ({ value }: addContent) => {
    set((state: TaskStore) => {
      const row = generateUUID(6);
      const coll = generateUUID(6);

      const updatedContent = [state.task.content];
      return {
        ...state,
        task: { ...state.task, content: updatedContent },
      };
    });
  },
  updateContent: ({ id, key, value }: updateContent) => {
    set((state: TaskStore) => {
      const updatedContent = state.task.content;
      return {
        ...state,
        task: { ...state.task, content: updatedContent },
      };
    });
  },
});

const useTaskStore = create<TaskStore>()(
  devtools(persist(courseStore, { name: 'courses' }))
);

export default useTaskStore;
