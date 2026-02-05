import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  template: `
    <div class="todo-item" [class.completed]="todo.completed">
      <div class="todo-content">
        <input 
          type="checkbox" 
          class="checkbox"
          [checked]="todo.completed"
          (change)="onToggleComplete()">
        
        <span class="todo-text" [class.completed]="todo.completed">
          {{ todo.text }}
        </span>
      </div>
      
      <button 
        type="button"
        class="btn btn-danger" 
        (click)="onDelete()">
        Delete
      </button>
    </div>
  `
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  
  onToggleComplete(): void {
    this.toggleComplete.emit(this.todo.id);
  }
  
  onDelete(): void {
    this.delete.emit(this.todo.id);
  }
}