import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [{ taskName: 'Brush teeth', isCompleted: false, isEditable: false }];

  constructor() { }

  ngOnInit(): void {
    this.getFromLocalStorage();
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false
    });

    this.saveToLocalStorage();
    form.reset();
  }

  saveToLocalStorage() {
    let stringJSON = JSON.stringify(this.taskArray);
    localStorage.setItem('todolist', stringJSON);
  }

  getFromLocalStorage() {
    let itemsJSONString = localStorage.getItem('todolist');
    if (itemsJSONString != null) {
      this.taskArray = JSON.parse(itemsJSONString);
    }
  }

  onDelete(index: number) {
    console.log(index);
    this.taskArray.splice(index, 1);
    this.saveToLocalStorage();
  }

  onCheck(index: number) {
    console.log(this.taskArray);
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.saveToLocalStorage();
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
  }

  onSave(index: number, newtask: string) {
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
    this.saveToLocalStorage();
  }
}
