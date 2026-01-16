import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';

const STORAGE_KEY = 'todos';
@Injectable({
  providedIn: 'root',
})

export class TodoService {


  getTodos(): TodoModel[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  saveTodos(todos: TodoModel[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }

  addTodo(todo: {
    title: string;
    description: string;
    finishDate: any;
    timeTaken: any;
  }) {
    const newTodo = {
      id: Date.now(),
      completed: false,
      ...todo
    };

    const todos = this.getTodos();
    todos.push(newTodo);
    this.saveTodos(todos);

    return newTodo;
  }
}
