import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToDoListApiService } from '../api/to-do-list-api.service';
import { ToDo, UUID } from 'src/app/types/toDoType';
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
    this.apiService.update(toDo).subscribe({
      next: () => {
        this.getToDoList();
        DialogService.closeModal(modalId);
        if (dialogService) {
          dialogService.initForm();
          console.log(12312);
        }
        AlertService.doSuccessAlert("Sie haben das ToDo erfolgreich geändert. ");
      },
      error: (error) => AlertService.doInfoAlert(error.message)
    });
  }

  public deleteToDo(id: UUID) {
    this.apiService.delete(id).subscribe({
      next: () => this.getToDoList(),
      error: (error) => AlertService.doInfoAlert(error.message)
    });
  }
}