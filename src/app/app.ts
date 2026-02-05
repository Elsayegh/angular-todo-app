import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item.component';
import { TodoFormComponent } from './todo-form.component';
import { TodoStatsComponent } from './todo-stats.component';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TodoFormComponent, TodoStatsComponent],
  template: `
    <div style="max-width: 800px; margin: 50px auto; padding: 20px;">
      <h1 style="text-align: center; margin-bottom: 30px; font-size: 48px;">
        ✅ My Todo App
      </h1>
      
      <app-todo-stats [todos]="todos"></app-todo-stats>
      
      <app-todo-form (todoAdded)="handleTodoAdded($event)"></app-todo-form>
      
      <div class="filter-container">
        <div class="filter-group">
          <button 
            class="filter-btn"
            [class.active]="currentFilter === 'all'"
            (click)="currentFilter = 'all'">
            All ({{ todos.length }})
          </button>
          
          <button 
            class="filter-btn"
            [class.active]="currentFilter === 'active'"
            (click)="currentFilter = 'active'">
            Active ({{ getActiveTodos().length }})
          </button>
          
          <button 
            class="filter-btn"
            [class.active]="currentFilter === 'completed'"
            (click)="currentFilter = 'completed'">
            Completed ({{ getCompletedTodos().length }})
          </button>
        </div>
      </div>
      
      <div class="card">
        <h2 class="section-title">{{ getFilterTitle() }}</h2>
        
        <app-todo-item 
          *ngFor="let todo of getFilteredTodos()"
          [todo]="todo"
          (toggleComplete)="handleToggle($event)"
          (delete)="handleDelete($event)">
        </app-todo-item>
        
        <p *ngIf="getFilteredTodos().length === 0" 
           style="text-align: center; color: #999; padding: 40px; font-size: 18px;">
          {{ getEmptyMessage() }}
        </p>
      </div>
      
      <button 
        *ngIf="getCompletedTodos().length > 0"
        class="btn btn-danger"
        style="width: 100%; margin-top: 20px; padding: 15px; font-size: 16px;"
        (click)="clearCompleted()">
        Clear Completed ({{ getCompletedTodos().length }})
      </button>
    </div>
  `
})
export class App {
  todos: Todo[] = [];
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  private nextId = 1;
  
  handleTodoAdded(text: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      text: text,
      completed: false
    };
    this.todos.push(newTodo);
  }
  
  handleToggle(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
  
  handleDelete(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }
  
  clearCompleted(): void {
    this.todos = this.todos.filter(t => !t.completed);
  }
  
  // Filter helpers
  getActiveTodos(): Todo[] {
    return this.todos.filter(t => !t.completed);
  }
  
  getCompletedTodos(): Todo[] {
    return this.todos.filter(t => t.completed);
  }
  
  getFilteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case 'active':
        return this.getActiveTodos();
      case 'completed':
        return this.getCompletedTodos();
      default:
        return this.todos;
    }
  }
  
  getFilterTitle(): string {
    switch (this.currentFilter) {
      case 'active':
        return '📝 Active Todos';
      case 'completed':
        return '✅ Completed Todos';
      default:
        return '📋 All Todos';
    }
  }
  
  getEmptyMessage(): string {
    switch (this.currentFilter) {
      case 'active':
        return 'No active todos! All done! 🎉';
      case 'completed':
        return 'No completed todos yet. Start checking them off!';
      default:
        return 'No todos yet. Add one above! 🚀';
    }
  }
}