import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-todo-action-renderer',
  template: `
    <div class="action-cell">
      <input
        type="checkbox"
        [checked]="params.data.completed"
        (click)="$event.stopPropagation()"
        (change)="toggleCompleted($event)"
      />

      <button
        class="delete-btn"
        (click)="onDelete($event)"
      >
        🗑
      </button>
    </div>
  `
})
export class TodoActionRendererComponent
  implements ICellRendererAngularComp {

  params!: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  toggleCompleted(event: Event) {
    event.stopPropagation();

    this.params.context.componentParent.onToggleCompleted(
      this.params.data.id,
      (event.target as HTMLInputElement).checked
    );
  }


  onDelete(event: Event) {
    event.stopPropagation();

    this.params.context.componentParent.onDeleteTodo(
      this.params.data.id
    );
  }
}
