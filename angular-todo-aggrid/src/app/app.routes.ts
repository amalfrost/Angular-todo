import { Routes } from '@angular/router';
import { Todo } from './components/todo/todo';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todoList',
        pathMatch: 'full'
    },
    {
        path: 'todoList',
        component: Todo
    },

];
