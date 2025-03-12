import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs/jobs.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  jobs: any = []; // Store the jobs
  jobToast: any = [];
  loading = false; // To show a loading spinner

  constructor(private jobsService: JobsService, private router: Router) {}

  ngOnInit(): void {
    interval(5000).subscribe(() => this.fetchNewJobs());
    this.loadJobs(); // Call the loadTasks function on component initialization
  }

  // Lazy loading function
  loadJobs(): void {
    this.loading = true; // Show the loading spinner

    // Call the JobsService to fetch jobs
    this.jobsService.getJobs().subscribe(
      (response) => {
        this.jobs = response; // Store the fetched jobs
        localStorage.setItem('jobs', JSON.stringify(this.jobs)); // Cache jobs
        this.loading = false; // Hide the loading spinner
      },
      (error) => {
        console.error('Error fetching jobs', error);
        this.loading = false; // Hide the loading spinner
      }
    );
  }

  viewJob(positionId: any, index: number) {
    const job = this.jobs['position'][index];
    localStorage.setItem('job' + positionId, JSON.stringify(job)); // Cache job
    this.router.navigate(['/job', positionId]); // Navigate to job details page
  }

  fetchNewJobs() {
    this.jobsService.fetchNewJobs().subscribe(
      (response: any) => {
        this.jobToast = response;
      },
      (error) => {
        console.error('Error fetching jobs', error);
        this.loading = false; // Hide the loading spinner
      }
    );
  }

  markAsSpam(jobId: number): void {
    this.jobsService.markJobAsSpam(jobId).subscribe(() => {
      this.jobToast = this.jobToast.filter((job: any) => job.id !== jobId);
    });
  }

  approveJob(jobId: number): void {
    this.jobsService.approveJob(jobId).subscribe(() => {
      this.jobToast = this.jobToast.filter((job: any) => job.id !== jobId);
    });
  }

  closeToast(i: any) {
    this.jobToast.splice(i, 1);
  }
}
