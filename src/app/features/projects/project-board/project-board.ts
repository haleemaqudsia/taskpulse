import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; 
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../tasks/services/task';
import { TaskListItem } from '../../../core/models/task.model';


@Component({
  selector: 'app-project-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, RouterLink],
  templateUrl: './project-board.html'
})
export class ProjectBoard implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  projectId = Number(this.route.snapshot.paramMap.get('id'));

  todo = signal<TaskListItem[]>([]);
  inProgress = signal<TaskListItem[]>([]);
  review = signal<TaskListItem[]>([]);
  done = signal<TaskListItem[]>([]);
  blocked = signal<TaskListItem[]>([]);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getForProject(this.projectId).subscribe(result => {
      const tasks = result.items;
      this.todo.set(tasks.filter(t => t.status === 'To-Do'));
      this.inProgress.set(tasks.filter(t => t.status === 'In Progress'));
      this.review.set(tasks.filter(t => t.status === 'Review'));
      this.done.set(tasks.filter(t => t.status === 'Done'));
      this.blocked.set(tasks.filter(t => t.status === 'Blocked'));
    });
  }

  drop(event: CdkDragDrop<TaskListItem[]>, newStatus: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const task = event.container.data[event.currentIndex];
      this.taskService.updateStatus(task.id, newStatus).subscribe();
    }
  }
}
