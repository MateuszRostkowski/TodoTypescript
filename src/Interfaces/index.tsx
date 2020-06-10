export interface Todo {
  id: string;
  name: string;
  date: Date;
  done: boolean;
}

export type viewState = 'default' | 'edit';
