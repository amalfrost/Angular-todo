import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TodoService } from '../../services/todo.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { TodoModel } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { TodoActionRendererComponent } from '../todo-action-renderer/todo-action-renderer';


ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-todo',
  imports: [InputTextModule, TodoActionRendererComponent, CommonModule, FormsModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule, AgGridAngular],
  templateUrl: './todo.html',
  standalone: true,
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
  components = {
    todoActionRenderer: TodoActionRendererComponent
  };

  todoForm!: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = fb.group({
      title: ['', Validators.required],
      description: [''],
      finishDate: [null],
      timeTaken: [null]
    })

  }
  todos: TodoModel[] = [];

  onDeleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todoService.saveTodos(this.todos);
  }
  onToggleCompleted(id: number, completed: boolean) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo
    );

    this.todoService.saveTodos(this.todos);
  }




  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }


  colDefs: ColDef[] = [
    {
      headerName: '',
      field: 'actions',
      width: 120,
      editable: false,
      cellRenderer: 'todoActionRenderer'
    },


    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      editable: true
    },

    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      editable: true
    },

    {
      field: 'finishDate',
      headerName: 'Finish Date',
      editable: true,
      valueFormatter: p =>
        p.value ? new Date(p.value).toLocaleDateString() : '',
      valueParser: p => new Date(p.newValue)
    },

    {
      field: 'timeTaken',
      headerName: 'Time Taken (hrs)',
      editable: true
    }
  ];


  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  getRowId = (params: any) => {
    return params.data.id;
  };



  onCellClicked(event: any) {
    if (event.colDef.field === 'completed') {
      // Force row style re-evaluation
      event.api.redrawRows({ rowNodes: [event.node] });
      debugger;

      // Persist changes
      this.todoService.saveTodos(this.todos);
    }
  }


  onCellValueChanged(event: any) {
    // Force row style refresh
    event.api.refreshCells({
      rowNodes: [event.node],
      force: true
    });
    debugger;

    // Persist changes
    this.todoService.saveTodos(this.todos);
  }


  // rowClassRules = {
  //   'completed-row': (params: any) => params.data.completed === true
  // };
  rowClassRules = {
    'completed-row': (params: any) => {
      console.log(
        'Evaluating row',
        params.data.id,
        'completed =',
        params.data.completed
      );
      return params.data.completed === true;
    }
  };

  addTodo() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    // TODO: add ag grid , and when the todos are added , show the data in tableSS

    const formValue = this.todoForm.value;

    const newTodo = this.todoService.addTodo({
      title: formValue.title!,
      description: formValue.description!,
      finishDate: formValue.finishDate!,
      timeTaken: formValue.timeTaken!
    });
    this.todos = [...this.todos, newTodo];

    // Reset form
    this.todoForm.reset();
  }

}
