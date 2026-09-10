import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html'
})
export class ProjectForm {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['']
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading = true;
    const v = this.form.value;
    this.projectService.create({
      name: v.name!,
      description: v.description || null,
      startDate: v.startDate!,
      endDate: v.endDate || null
    }).subscribe({
      next: () => this.router.navigate(['/projects']),
      error: () => { this.errorMessage = 'Failed to create project.'; this.isLoading = false; }
    });
  }
}