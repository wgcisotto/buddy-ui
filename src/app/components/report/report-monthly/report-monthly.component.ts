import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarView, DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ChartDataSets } from 'chart.js';
import { MovementType } from 'src/app/models/enums/MovementType';
import { CategoryService } from 'src/app/services/category/category.service';
import { MovementService } from 'src/app/services/movement/movement.service';

@Component({
  selector: 'report-monthly',
  templateUrl: './report-monthly.component.html',
  styleUrls: ['./report-monthly.component.css']
})
export class ReportMonthlyComponent implements OnInit {

  movementTpe = MovementType;

  public categoryLabels = [];
  
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];

  public barChartData: ChartDataSets[] = [
    // {data: [120, 130, 60, 50], label: 'Média'},
    {data: [90, 150, 60, 50], label: 'Forecast'}
  ];
  public barChartType = 'bar';

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartType = 'line';

  
  @ViewChild('ejDateTimePicker') ejDateTimePicker: DateTimePickerComponent;
  start: CalendarView = 'Year';
  depth: CalendarView = 'Year';
  format: string = 'MMMM y'
  filterDate = new Date();
  
  form: FormGroup;

  constructor(
    private categoryService: CategoryService, 
    private movementService: MovementService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filterDate: new Date()
    })
    this.getCategoriesFromServer(this.movementTpe.EXPENSE);
    this.loadChartLine();
    this.loadMovements();
    this.loadChartBar();
  }

  loadChartBar(){
    this.movementService.getAverageGroupedByCategory()
    .subscribe(movements => {
      let data = [];
      this.categoryLabels.forEach( categ => {
        console.log("category: " +  categ)
        let amount = movements[categ];
        console.log("amount: " + amount)
        if(amount !=  undefined){
          // this.addPieChartData(amount)
          data.push(amount)
        }else {
          // this.addPieChartData(0)
          data.push(0)
        }
      })
      this.barChartData.push({
        label: 'Média',
        data: data,
        type: 'line'
      })
    });
  }

  loadChartLine(){
    let data  = [28, 48, 40, 19, 86, 27, 90, 80, 89, 60, 34, 24];
    this.lineChartData.push({
      label: 'category',
      data: data
    });
  }

  loadMovements(){
    this.pieChartData = [];
    console.log(this.form.get("filterDate").value)
    this.movementService.getByMonthAndYearGroupByCategory(this.form.get("filterDate").value)
    .subscribe( movements => {
        console.log(movements)
        
        if(movements === undefined){
          this.message("Falha ao carregar os movimentos");
          return;
        }

        this.categoryLabels.forEach( categ => {
          console.log("category: " +  categ)
          let amount = movements[categ];
          console.log("amount: " + amount)
          if(amount !=  undefined){
            this.addPieChartData(amount)
          }else {
            this.addPieChartData(0)
          }
        })
    });
  }

  addPieChartData(amount: number){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.pieChartData.push(amount);
    this.pieChartColors[0].backgroundColor.push("#"+randomColor);
  }

  submitDateChange() {
    console.log("load according to filter")
    this.loadMovements();
  }

  getCategoriesFromServer(type: MovementType): void {
    this.categoryService.getAllByType(type)
      .subscribe(categories => {
        console.log(categories);

        return this.categoryLabels = categories.map(categ => categ.name);

      });
  }

  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogForecastSetup, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  message(message: string){
    this._snackBar.open(message, 'ok', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'dialog-forecast-setup',
  templateUrl: 'dialog-forecast-setup.html',
})
export class DialogForecastSetup {

  constructor(
    public dialogRef: MatDialogRef<DialogForecastSetup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

// [] media 
// [] forecast 

  onNoClick(): void {
    this.dialogRef.close();
  }

}