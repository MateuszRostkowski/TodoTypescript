export interface Todo {
  id: string;
  user: string;
  name: string;
  date: Date;
  done: boolean;
}

export type viewState = 'default' | 'edit';
