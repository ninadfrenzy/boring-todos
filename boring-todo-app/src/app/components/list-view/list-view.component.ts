import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass']
})
export class ListViewComponent implements OnChanges {

  @Input()
  collectionReference: Todo[];

  @Input()
  collectionName: string;

  @Output()
  todoUpdateEvent: EventEmitter<Todo> = new EventEmitter<Todo>();

  isEditMode: boolean = false;
  constructor() { }

  ngOnChanges(): void {

  }

  updateTodo(todo: Todo, toggleCompleted: boolean) {
    toggleCompleted? todo.completed = ! todo.completed: todo.completed = todo.completed;
    this.todoUpdateEvent.emit(todo)
  }

}
