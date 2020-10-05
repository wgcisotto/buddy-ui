import { Movement } from './../../models/Movement';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MovementService } from './../../services/movement/movement.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarView, DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'movements-timeline',
  templateUrl: './movements-timeline.component.html',
  styleUrls: ['./movements-timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovementsTimelineComponent implements OnInit {
  @ViewChild('ejDateTimePicker') ejDateTimePicker: DateTimePickerComponent;

  constructor(
    private movementService: MovementService,
    private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar) { }

  movements : Movement[] = [];
  
  start: CalendarView = 'Year';
  depth: CalendarView = 'Year';
  format: string = 'MMMM y'

  timelineDate = new Date();
  
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      timelineDate: new Date()
    })
    this.loadMovements();
  }

  loadMovements(){
    console.log(this.form.get("timelineDate").value)
    this.movementService.getByMonthAndYear(this.form.get("timelineDate").value)
    .subscribe( movements => {
        console.log(movements)
        if(movements === undefined){
          this.message("Falha ao carregar os movimentos");
        }
        this.movements = movements;
    });
  }

  submitDateChange() {
    console.log(this.form.get("timelineDate").value);
    this.loadMovements();
  }

  message(message: string){
    this._snackBar.open(message, 'ok', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
