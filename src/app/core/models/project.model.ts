export interface Project {
  id: number;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  createdDate: string;
  createdByUserId: number;
  status: string;
  priority: string;
  taskCount: number;
}

export interface CreateProjectRequest {
  name: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
}

export interface ProjectMember {
  id: number;
  projectId: number;
  userId: number;
  userName: string;
  joinedDate: string;
  role: string;
}