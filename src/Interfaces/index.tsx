export interface Todo {
  /**
   * Example of type definitions, you can show default value, type etc..
   * You need to add it on top of your value or method
   *
   * @default 12
   * @type {string}
   */
  id: string;
  user: string;
  name: string;
  date: Date;
  done: boolean;
}

export type viewState = 'default' | 'edit';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Todos: undefined;
};

interface Person {
  email: string;
}

export interface TodoListItem {
  id: string;
  name: string;
  description: string;
  details: string;
  owner: Person;
  people: Person[];
}
