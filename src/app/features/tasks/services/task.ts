import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  TaskListItem,
  PagedResult,
  CreateTaskRequest
} from '../../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/tasks`;

  getForProject(
    projectId: number
  ): Observable<PagedResult<TaskListItem>> {
    return this.http.get<PagedResult<TaskListItem>>(
      `${environment.apiUrl}/projects/${projectId}/tasks?pageSize=100`
    );
  }

  create(request: CreateTaskRequest): Observable<any> {
    return this.http.post(this.baseUrl, request);
  }

  updateStatus(
    id: number,
    status: string
  ): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/${id}/status`,
      { status }
    );
  }
}