import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id?: string,
  contactPerson:string,
  createdAt?: string,
  date: string,
  entityName: string,
  note: string,
  phoneNumber: string,
  status:string,
  taskType: string,
  time: string,
  updatedAt?: string
}

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  private apiUrl = 'https://flasktask.vercel.app/api/tasks';

  constructor(private http: HttpClient) {}


  getTasks(): Observable<{ result: Task[] }> {
    return this.http.get<{ result: Task[] }>(this.apiUrl);
  }

  addTask(task: Task): Observable<{ result: Task }> {
    return this.http.post<{ result: Task }>(this.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<{ result: Task }> {
    return this.http.put<{ result: Task }>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<{ result: Task }> {
    return this.http.delete<{ result: Task }>(`${this.apiUrl}/${id}`);
  }


  

}
