import { Component, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-todo-form',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="card">
        <h2 class="section-title">➕ Add New Todo</h2>

        <div class="form-group">
            <input type="text"
            class="input"
            [(ngModel)]="todoText"
            (keyup.enter)="addTodo()"
            placeholder="what needs to be done?">

            <button class=" btn btn-primary" (click)="addTodo()" [disabled]="todoText.trim() === ''">Add</button>
            
        </div>
    </div>
    `,
    styles: []
})

export class TodoFormComponent{
    @Output() todoAdded = new EventEmitter<string>();
    todoText: string = '';

    addTodo(): void
    {
        if(this.todoText.trim())
        {
            this.todoAdded.emit(this.todoText.trim());
            this.todoText = '';
        }
    }
}