import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobComponent } from './pages/jobs/job/job.component';
import { JobFormComponent } from './pages/jobs/form/job-form.component';


const routes: Routes = [
  {
    path: 'jobs',
    component: JobsComponent,
  },
  { path: 'job/:id', component: JobComponent },
  { path: 'job-form', component: JobFormComponent },
  { path: '**', redirectTo: 'jobs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
