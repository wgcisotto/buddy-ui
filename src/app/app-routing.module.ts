import { MovementsTimelineComponent } from './movements-timeline/movements-timeline.component';
import { SupermarketComponent } from './supermarket/supermarket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovementsComponent } from './movements/movements.component';
import { ReportAnnualComponent } from './report-annual/report-annual.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movements-timeline', component: MovementsTimelineComponent },
  { path: 'supermarket', component: SupermarketComponent },
  { path: 'movements', component: MovementsComponent },
  { path: 'report-annual', component: ReportAnnualComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
