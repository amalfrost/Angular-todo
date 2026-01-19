import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoActionRenderer } from './todo-action-renderer';

describe('TodoActionRenderer', () => {
  let component: TodoActionRenderer;
  let fixture: ComponentFixture<TodoActionRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoActionRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoActionRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
