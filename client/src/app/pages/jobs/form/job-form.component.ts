import { Component } from '@angular/core';
import { JobsService } from '../../../services/jobs/jobs.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent {
  job = {
    title: '',
    description: '',
    email: '',
  };

  constructor(private jobService: JobsService) {}

  submitJob() {
    this.jobService.postJob(this.job).subscribe(
      () => alert('Job submitted successfully!'),
      () => alert('Error submitting job')
    );
  }
}
