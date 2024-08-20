import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from 'src/app/types/toDoType';

@Injectable({
  providedIn: 'root'
})
export class ToDoListApiService {

  private http: HttpClient = inject(HttpClient);

  private static serverUrl: string = 'http://localhost:3000/ToDoList';

  post(data: ToDo) {
    return this.http.post<ToDo>(ToDoListApiService.serverUrl, data);
  }

  get() {
    return this.http.get<ToDo[]>(ToDoListApiService.serverUrl);
  }

  delete(id: any) {
    return this.http.delete<any>(ToDoListApiService.serverUrl + "/" + id);
  }

  upadte(data: ToDo, id: number) {
    return this.http.put<ToDo>(ToDoListApiService.serverUrl + "/" + id, data);
  }
}
