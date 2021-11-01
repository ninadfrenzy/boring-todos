import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Todo } from 'src/app/models/todo.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-todo-root',
  templateUrl: './todo-root.component.html',
  styleUrls: ['./todo-root.component.sass']
})
export class TodoRootComponent implements OnInit {
  public selectedCollection: Todo[];
  public selectedCollectionName: string;
  public allCollections: Array<string>;
  constructor(private afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { 
    
  }

  ngOnInit(): void {
    this.getCollections()
  }

  selectCollection(collectionName:string) {
    
    let collection = this.firestore.collection<Todo>(collectionName).valueChanges({idField: 'todoId'});
    collection.subscribe({
      next: data => {
        

        let arrayOfTodos = data;
        this.selectedCollection = arrayOfTodos.sort((a:Todo,b:Todo): number=>{
          return (a.completed === b.completed)? 0 : a.completed? 1 : -1;
        })
        console.log(this.selectedCollection);
        
        this.selectedCollectionName = collectionName;
      }
    })
  }
  getCollections() {
    this.firestore.collection('todo-collections').valueChanges().subscribe({
      next: (data:any) => {
        this.allCollections = data[0]['collections'];
        this.allCollections.includes('Master') ? this.selectCollection('Master') : this.selectCollection(this.allCollections[0]);
        
      }
    })
  }

  onTodoUpdate(todo: Todo) {
    this.firestore.doc(todo.parentCollection+'/'+todo.todoId).update(todo).then(res=>{
      console.log(res);
      
    })
    
  }

  addTodo(input: HTMLInputElement) {
    let todo:Todo = {
      todoText: input.value,
      completed: false,
      parentCollection: this.selectedCollectionName
    }
    this.firestore.collection(this.selectedCollectionName).add(todo).then(onSuccess => {
      console.log('added');
      input.value = '';
    })
  }

}
