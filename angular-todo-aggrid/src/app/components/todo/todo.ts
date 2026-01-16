import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from '../../models/todo.model';
@Component({
  selector: 'app-todo',
  imports: [InputTextModule, FormsModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule],
  templateUrl: './todo.html',
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
