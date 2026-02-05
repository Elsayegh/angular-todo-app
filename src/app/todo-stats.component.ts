import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-header">
      <h2 class="stats-title">📊 Todo Statistics</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ totalTodos }}</div>
          <div class="stat-label">Total</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-number">{{ completedTodos }}</div>
          <div class="stat-label">Completed</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-number">{{ pendingTodos }}</div>
          <div class="stat-label">Pending</div>
        </div>
      </div>
      
      <div class="completion-message">
        <span *ngIf="completionPercentage === 100 && totalTodos > 0">
          🎉 All done! Great job!
        </span>
        <span *ngIf="completionPercentage < 100 && totalTodos > 0">
          {{ completionPercentage }}% Complete
        </span>
        <span *ngIf="totalTodos === 0">
          Add your first todo to get started! 🚀
        </span>
      </div>
    </div>
  `
})
export class TodoStatsComponent {
  @Input() todos: Todo[] = [];
  
  get totalTodos(): number {
    return this.todos.length;
  }
  
  get completedTodos(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
  
  get pendingTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }
  
  get completionPercentage(): number {
    if (this.totalTodos === 0) return 0;
    return Math.round((this.completedTodos / this.totalTodos) * 100);
  }
}