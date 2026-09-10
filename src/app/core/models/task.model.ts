export interface TaskListItem {
  id: number;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedUserId: number | null;
  assignedUserName: string | null;
  projectId: number;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface CreateTaskRequest {
  title: string;
  description: string | null;
  projectId: number;
  assignedUserId: number | null;
  dueDate: string;
  priority: string;
  estimatedHours: number | null;
  parentTaskId: number | null;
}