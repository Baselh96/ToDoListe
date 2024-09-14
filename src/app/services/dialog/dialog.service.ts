import { inject, Injectable } from '@angular/core';
import { ToDoListApiService } from '../api/to-do-list-api.service';
import { ToDo } from 'src/app/types/toDoType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertService } from '../alert/alert.service';
import { ToDoListService } from '../toDoList/to-do-list.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private apiService = inject(ToDoListApiService);
  private datepipe: DatePipe = new DatePipe('en-US');

  public dialogForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);

  public postToDo(toDo: ToDo, modalId: string, toDoListService: ToDoListService) {
    this.apiService.post(toDo).subscribe({
      next: () => {
        toDoListService.getToDoList();
        this.initForm();
        DialogService.closeModal(modalId);
        AlertService.doSuccessAlert("Sie haben das ToDo erfolgreich erstellt. ");
      },
      error: (error) => AlertService.doInfoAlert(error.message)
    });
  }

  public initForm() {
    this.dialogForm = this.formBuilder.group({
      title: ['', Validators.required],
      categorie: [''],
      status: ['open', Validators.required],
      description: [''],
      createdDate: [this.datepipe.transform(new Date(), 'YYYY-MM-dd'), Validators.required],
      createdTime: [this.datepipe.transform(new Date(), 'HH:mm'), Validators.required],
      doneDate: [''],
      doneTime: [''],
    });
  }

  public copyToDoToDialogForm(toDo: ToDo) {
    this.dialogForm.controls["title"].setValue(toDo.title);
    this.dialogForm.controls["categorie"].setValue(toDo.categorie);
    this.dialogForm.controls["status"].setValue(toDo.status);
    this.dialogForm.controls["description"].setValue(toDo.description);
    this.dialogForm.controls["createdDate"].setValue(this.datepipe.transform(toDo.date, 'YYYY-MM-dd'));
    this.dialogForm.controls["createdTime"].setValue(this.datepipe.transform(toDo.date, 'HH:mm'));
    this.dialogForm.controls["doneDate"].setValue(
      toDo.done_date.length !== 0 ? this.datepipe.transform(toDo.done_date, 'YYYY-MM-dd') : ""
    );
    this.dialogForm.controls["doneTime"].setValue(
      toDo.done_date.length !== 0 ? this.datepipe.transform(toDo.done_date, 'HH:mm') : ""
    );
  }

  public copyDialogFormToToDo(): ToDo {
    return {
      id: "",
      title: this.dialogForm.value["title"],
      categorie: this.dialogForm.value["categorie"],
      status: this.dialogForm.value["status"],
      description: this.dialogForm.value["description"],
      date: new Date(this.dialogForm.value["createdDate"] + "T" + this.dialogForm.value["createdTime"]).toString(),
      done_date: this.getDoneDate(),
    }
  }

  private getDoneDate(): string {
    const tempDate = this.dialogForm.value["doneDate"].toString();
    const tempTime = this.dialogForm.value["doneTime"].toString();

    if (tempDate === "" && tempTime === "") return "";
    if (tempDate === "" && tempTime !== "") {
      const [hours, minutes] = tempTime.split(":").map(Number);
      const today = new Date();
      today.setHours(hours, minutes, 0, 0);
      return today.toString();
    }
    if (tempDate !== "" && tempTime === "") {
      const [years, months, days] = tempDate.split("-").map(Number);
      const today = new Date();
      today.setFullYear(years, months, days);
      return today.toString();
    };
    return new Date(tempDate + "T" + tempTime).toString();
  }

  public static closeModal(modalId: string) {
    document.getElementById(modalId + "-close")?.click();
  }
}
