import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ToDoListService } from 'src/app/services/toDoList/to-do-list.service';
import { ToDo, UUID } from 'src/app/types/toDoType';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() toDo!: Observable<ToDo>;
  @Input() modalId: string = "";

  public title: string = "Neue ToDO zu der Liste hinzufügen";
  public id: UUID | undefined;

  private toDoListService: ToDoListService = inject(ToDoListService);
  public dialogService: DialogService = inject(DialogService);

  ngOnInit(): void {
    this.dialogService.initForm();

    if (this.toDo) {
      this.toDo.subscribe(toDo => {
        this.title = `Todo "${toDo.title}" ändern`;
        this.id = toDo.id;
        this.dialogService.copyToDoToDialogForm(toDo);
      })
    }
  }

  public saveToDo() {
    const form = document.getElementById('needValidation');
    form?.classList.add("was-validated");

    if (this.dialogService.dialogForm.valid) {
      const newToDo: ToDo = this.dialogService.copyDialogFormToToDo();
      if (this.toDo) {
        newToDo.id = this.id as UUID;
        this.toDoListService.updateToDo(newToDo, this.modalId, this.dialogService);
      } else {
        this.dialogService.postToDo(newToDo, this.modalId, this.toDoListService);
      }
      form?.classList.remove("was-validated");
    }
  }
}
