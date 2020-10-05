import { ReportMonthlyComponent } from './components/report/report-monthly/report-monthly.component';
import { MovementsTimelineComponent } from './components/movements-timeline/movements-timeline.component';
import { SupermarketComponent } from './components/supermarket/supermarket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MovementsComponent } from './components/movements/movements.component';
import { ReportAnnualComponent } from './components/report/report-annual/report-annual.component';

const routes: Routes = [
  { path: '', redirectTo: '/report-monthly', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent }, // talvez remover essa rota
  { path: 'movements-timeline', component: MovementsTimelineComponent },
  { path: 'supermarket', component: SupermarketComponent }, // remover futuramente esta rota
  { path: 'movements', component: MovementsComponent },
  { path: 'report-annual', component: ReportAnnualComponent },
  { path: 'report-monthly', component: ReportMonthlyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
