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

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-todo',
  imports: [InputTextModule, CommonModule, FormsModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule, AgGridAngular],
  templateUrl: './todo.html',
  standalone: true,
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
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


  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

  colDefs: ColDef[] = [
    {
      field: 'completed',
      headerName: 'Done',
      width: 90,
      editable: true,
      cellRenderer: 'agCheckboxCellRenderer',
      cellStyle: { textAlign: 'center' }
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

  onCellClicked(event: any) {
    if (event.colDef.field === 'completed') {
      // Force row style re-evaluation
      event.api.redrawRows({ rowNodes: [event.node] });

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

    // Persist changes
    this.todoService.saveTodos(this.todos);
  }


  rowClassRules = {
    'completed-row': (params: any) => params.data.completed === true
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
