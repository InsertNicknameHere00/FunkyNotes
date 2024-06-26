import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DragDropModule,MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FunkyNotes';
  public counter=0;
  public SelectedNoteCounter=0;
    public titleLengthMin=5;
  public descLengthMin=7;
  public categoryLengthMin=2;
  public LengthErrorTitle=false;
  public LengthErrorDesc=false;
  public LengthErrorCategory=false;
  public modelTitle='';
  public modelDesc='';
  public modelSort='';
  public modelCategory='';
  public WannaEditData=false;
  public isEditChecked=false;
  public EndOfChecks=false;

  public NoteCollection:{title:string,description:string , Category:string}[]= [];

public ProcessSave() {
  if(this.EndOfChecks!=true){
    if(this.modelTitle.length>this.titleLengthMin){
      this.NoteCollection[this.counter].title = this.modelTitle;
    }else {
      console.log('Title is too short!');
      this.LengthErrorTitle=true;
      return;
    }

    if(this.modelDesc.length>this.descLengthMin){
      this.NoteCollection[this.counter].description = this.modelDesc;
    } else {
      console.log('Description is too short!');
      this.LengthErrorDesc=true;
      return;
    }

    if(this.modelCategory.length>this.categoryLengthMin){
      this.NoteCollection[this.counter].Category = this.modelCategory;
    } else {
      console.log('Category is too short!');
      this.LengthErrorCategory=true;
      return;
  }
  this.EndOfChecks=true;
}
  this.resetTempData();
}

private resetTempData(){
  this.modelTitle='';
  this.modelDesc='';
  this.modelCategory='';
  this.LengthErrorTitle=false;
  this.LengthErrorCategory=false;
  this.LengthErrorDesc=false;
  this.EndOfChecks=false;
}

public ProcessAddNote(){
  if(this.modelTitle.length > this.titleLengthMin && this.modelDesc.length > this.descLengthMin && this.modelCategory.length > this.categoryLengthMin){
    this.NoteCollection.push({title: this.modelTitle, description: this.modelDesc, Category: this.modelCategory});
    this.resetTempData();
  } else {
    console.log('Title, Category, or Description is too short');
   this.LengthErrorCategory=true;
    this.LengthErrorDesc=true;
    this.LengthErrorTitle=true;
    return;
  }
}

  public ProcessNoteEdit(NoteElement, index) {
    this.counter = index;
    this.WannaEditData=true;
this.modelTitle=NoteElement.title;
this.modelDesc=NoteElement.description;
this.modelCategory=NoteElement.Category;
}

  public ProcessNoteDelete(NoteElement){
    let index = this.NoteCollection.indexOf(NoteElement);
    this.NoteCollection.splice(index,1);
    if (this.counter > this.NoteCollection.length - 1) {
      console.log('End of list');
      this.isEditChecked=false;
      this.WannaEditData=false;
      this.counter=0;
      this.resetTempData();
  }
}

    public ProcessEdit(index){
      this.SelectedNoteCounter=index;
      this.isEditChecked=true;
    }

    public ProcessFinishEdit(){
      this.isEditChecked=false;
      this.WannaEditData=false;
      }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.NoteCollection, event.previousIndex, event.currentIndex);
  }
  
  public ProcessSort(){
      this.NoteCollection.sort((a,b) => a.title.localeCompare(b.title));
  }

  public ProcessSortByCategory(){
    if (this.NoteCollection.some(NoteCollection => NoteCollection.Category == this.modelSort)) {
      this.NoteCollection.sort((a,b) => a.Category.localeCompare(b.Category));
    }
  }

}
