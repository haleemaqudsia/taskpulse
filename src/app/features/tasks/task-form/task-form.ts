import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html'
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  projectId = Number(this.route.snapshot.queryParamMap.get('projectId'));
  isLoading = false;
  errorMessage = '';

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: ['', Validators.required],
    priority: ['Medium', Validators.required]
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading = true;
    const v = this.form.value;
    this.taskService.create({
      title: v.title!,
      description: v.description || null,
      projectId: this.projectId,
      assignedUserId: null,
      dueDate: v.dueDate!,
      priority: v.priority!,
      estimatedHours: null,
      parentTaskId: null
    }).subscribe({
      next: () => this.router.navigate(['/projects', this.projectId]),
      error: () => { this.errorMessage = 'Failed to create task.'; this.isLoading = false; }
    });
  }
}