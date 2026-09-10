import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../services/project';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);

  projects: Project[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (data) => { this.projects = data; this.loading = false; },
      error: () => { this.errorMessage = 'Failed to load projects.'; this.loading = false; }
    });
  }
}