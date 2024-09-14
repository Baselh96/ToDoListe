import { Injectable } from '@angular/core';
import { ToDo, UUID } from 'src/app/types/toDoType';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoListApiService {

  constructor() {
    if (!localStorage.getItem("ToDoListe")) localStorage.setItem("ToDoListe", JSON.stringify([]));
  }

  public post(data: ToDo): Observable<ToDo> {
    const list = this.getListAsJson();
    data.id = crypto.randomUUID();
    list.push(data);
    this.saveListe(list);
    return of<ToDo>(data);
  }

  public get(): Observable<ToDo[]> {
    return of<ToDo[]>(this.getListAsJson());
  }

  public delete(id: UUID): Observable<boolean> {
    const list = this.getListAsJson();
    this.saveListe(list.filter(item => item.id !== id));
    return of<boolean>(true);
  }

  update(data: ToDo): Observable<ToDo> {
    const list = this.getListAsJson();
    this.saveListe(list.map(item => item.id === data.id ? data : item));
    return of<ToDo>(data);
  }

  private getListAsJson(): ToDo[] {
    return JSON.parse(localStorage.getItem("ToDoListe") || "");
  }

  private saveListe(list: ToDo[]) {
    localStorage.setItem("ToDoListe", JSON.stringify(list));
  }

  /* private http: HttpClient = inject(HttpClient);

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
  } */
}
