import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

const STORAGE_KEY = 'todos';
@Injectable({
  providedIn: 'root',
})

export class TodoService {


  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  saveTodos(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }

  addTodos(title: string) {
    const todo: Todo = {
      id: Date.now(),
      title: title,
      completed: false
    }

    const todos = this.getTodos()
    todos.push(todo)
    this.saveTodos(todos);
    return todo;

  }
}
