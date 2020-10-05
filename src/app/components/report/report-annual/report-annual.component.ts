import { AnnualReport } from './../../../models/AnnualReport';
import { ReportService } from './../../../services/report/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'report-annual',
  templateUrl: './report-annual.component.html',
  styleUrls: ['./report-annual.component.css']
})
export class ReportAnnualComponent implements OnInit {

  report: Map<string, Map<string, number>>;
  reportCompact: Map<string, Map<string, number>>;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getReport();
    this.getReportCompact();
  }

  getReport(): void {
    this.reportService.getReport()
    .subscribe(report => {
      console.log(report);
      return this.report = report;
    });
  }

  getReportCompact(): void {
    this.reportService.getReportCompact()
    .subscribe(reportCompact => {
      console.log(reportCompact);
      return this.reportCompact = reportCompact;
    });
  }

}
