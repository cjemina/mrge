import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  job: any;
  loading = true;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const positionId = this.route.snapshot.paramMap.get('id');
    if (positionId) {
      const storedJobs = JSON.parse(
        localStorage.getItem('job' + positionId) || '[]'
      );

      if (storedJobs) {
        this.job = storedJobs;
        this.loading = false;
      }
    }
  }

  // Method to sanitize HTML
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
