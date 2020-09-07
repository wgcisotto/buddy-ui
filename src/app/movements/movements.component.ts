import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categCtrl = new FormControl();
  accountCtrl = new FormControl();
  filteredCateg: Observable<string[]>;
  filteredAccount: Observable<string[]>;
  accounts: string[] = ['Lemon'];
  allAccounts: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  categs: string[] = ['Lemon'];
  allCategs: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  disableSelect = new FormControl(true);

  checked = false;
  indeterminate = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.filteredAccount = this.accountCtrl.valueChanges.pipe(
        startWith(null),
        map((account: string | null) => account ? this._filterAccount(account) : this.allAccounts.slice()));
      this.filteredCateg = this.categCtrl.valueChanges.pipe(
        startWith(null),
        map((categ: string | null) => categ ? this._filterCateg(categ) : this.allCategs.slice()));
    }

  type: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.type = params['type'];
    });
    
  }
  
  ngOnDestroy() {
  }

  @ViewChild('categInput') categInput: ElementRef<HTMLInputElement>;
  @ViewChild('accountInput') accountInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  addCateg(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.categs.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.categCtrl.setValue(null);
  }

  removeCateg(categ: string): void {
    const index = this.categs.indexOf(categ);

    if (index >= 0) {
      this.categs.splice(index, 1);
    }
  }

  selectedCateg(event: MatAutocompleteSelectedEvent): void {
    this.categs.push(event.option.viewValue);
    this.categInput.nativeElement.value = '';
    this.categCtrl.setValue(null);
  }

  private _filterCateg(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategs.filter(categ => categ.toLowerCase().indexOf(filterValue) === 0);
  }

  addAccount(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.categs.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.categCtrl.setValue(null);
  }

  removeAccount(categ: string): void {
    const index = this.categs.indexOf(categ);

    if (index >= 0) {
      this.categs.splice(index, 1);
    }
  }

  selectedAccount(event: MatAutocompleteSelectedEvent): void {
    this.categs.push(event.option.viewValue);
    this.categInput.nativeElement.value = '';
    this.categCtrl.setValue(null);
  }

  private _filterAccount(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategs.filter(categ => categ.toLowerCase().indexOf(filterValue) === 0);
  }

}
