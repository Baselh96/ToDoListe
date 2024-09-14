import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ToDoListService } from 'src/app/services/toDoList/to-do-list.service';
import { ToDo, UUID } from 'src/app/types/toDoType';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  public displayedColumns: string[] = [
    'Titel',
    'Kategorie',
    'Erstellt am',
    'Zu erledigen am',
    'Status',
    'Beschreibung',
    'actions',
  ];
  public tableData: ToDo[] = [];
  public tableDataInit: ToDo[] = [];
  private toDoListService: ToDoListService = inject(ToDoListService);
  public tableView: boolean = false;

  private dialogPropertyState = new Subject<ToDo>();
  public dialogProperty: Observable<ToDo> = this.dialogPropertyState.asObservable();

  ngOnInit(): void {
    this.toDoListService.toDoList.subscribe((data: ToDo[]) => {
      this.tableData = data;
      this.tableDataInit = data;
    });
    this.toDoListService.getToDoList();
  }

  public changeStatus(event: any, row: ToDo) {
    const value: boolean = event.target.checked;

    if (value !== null && value !== undefined) {
      row.status = value ? "done" : "open";
      this.toDoListService.updateToDo(row, "", undefined);
    } else {
      AlertService.doInfoAlert("Änderungen können nicht gespeichert werden");
    }
  }

  public delete(id: UUID) {
    this.toDoListService.deleteToDo(id);
  }

  public openDialog(toDo: ToDo) {
    this.dialogPropertyState.next(toDo);
  }

  public doFilter(event: any) {
    const value: string = event.target.value;
    if (value === null || value === undefined || value === "") {
      this.tableData = [...this.tableDataInit];
    } else {
      this.tableData = [
        ...this.tableDataInit.filter((toDo: ToDo) =>
          toDo.title.toLocaleUpperCase().includes(value.toLocaleUpperCase()) ||
          toDo.categorie.toLocaleUpperCase().includes(value.toLocaleUpperCase()) ||
          toDo.status.toLocaleUpperCase().includes(value.toLocaleUpperCase()) ||
          toDo.description.toLocaleUpperCase().includes(value.toLocaleUpperCase())
        )];
    }
  }
}
