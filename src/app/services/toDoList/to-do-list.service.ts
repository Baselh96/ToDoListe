import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToDoListApiService } from '../api/to-do-list-api.service';
import { ToDo } from 'src/app/types/toDoType';
import { DialogService } from '../dialog/dialog.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  private toDoListState = new Subject<ToDo[]>();
  public toDoList = this.toDoListState.asObservable();

  private apiService = inject(ToDoListApiService);

  public getToDoList() {
    this.apiService.get().subscribe({
      next: (data: ToDo[]) => this.toDoListState.next(data),
      error: (error) => AlertService.doInfoAlert(error.message)
    });
  }

  public updateToDo(toDo: ToDo, modalId: string, dialogService?: DialogService) {
    this.apiService.upadte(toDo, toDo.id).subscribe({
      next: () => {
        this.getToDoList();
        DialogService.closeModal(modalId);
        if (dialogService) dialogService.initForm();
        AlertService.doSuccessAlert("Sie haben das ToDo erfolgreich geändert. ");
      },
      error: (error) => AlertService.doInfoAlert(error.message)
    });
  }

  public deleteToDo(id: number) {
    this.apiService.delete(id).subscribe({
      next: () => this.getToDoList(),
      error: (error) => AlertService.doInfoAlert(error.message)
    });
  }
}


/* 
{
  "ToDoList": [
    {
      "title": "Einkaufen",
      "categorie": "Wichtig",
      "date": "2023-04-12T22:00:00.000Z",
      "done_date": "2023-04-13T22:00:00.000Z",
      "status": "offen",
      "description": "EInkaufen gehen bitte",
      "id": 1
    },
    {
      "title": "Sport machen",
      "categorie": "Unwichtig",
      "date": "2023-04-12T22:00:00.000Z",
      "done_date": "2023-04-13T22:00:00.000Z",
      "status": "offen",
      "description": "Spart machen bitte",
      "id": 2
    },
    {
      "title": "Wäche waschen",
      "categorie": "langfristig",
      "date": "2023-04-22T20:00:00.000Z",
      "done_date": "2023-04-23T22:00:00.000Z",
      "status": "done",
      "description": "ich muss meine Wäsche waschen",
      "id": 3
    }
  ]
}
*/