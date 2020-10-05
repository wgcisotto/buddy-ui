import { MovementLayoutType } from './../../models/enums/MovementLayoutType';
import { MovementType } from './../../models/enums/MovementType';
import { MovementService } from './../../services/movement/movement.service';
import { Movement } from './../../models/Movement';
import { AccountService } from './../../services/account/account.service';
import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from 'src/app/models/Category';
import { Account } from 'src/app/models/Account';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  movementTpe = MovementType;

  movementLayoutType = MovementLayoutType
  typeOfMovement: string;

  //visible = true;
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  accountCtrl = new FormControl();
  accounts: Account[] = [];
  allAccounts: Account[] = [];
  filteredAccount: Observable<Account[]>;

  categCtrl = new FormControl();
  categs: Category[] = [];
  allCategs: Category[] = [];
  filteredCateg: Observable<Category[]>;

  form: FormGroup;
 
  supermarketEnabled: true;

  @ViewChild('categInput') categInput: ElementRef<HTMLInputElement>;
  @ViewChild('accountInput') accountInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoAccount') matAutocompleteAccount: MatAutocomplete;

  constructor(
    private categoryService: CategoryService,
    private accountService: AccountService,
    private movementService: MovementService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private _snackBar: MatSnackBar) {

    //allows to provide a custom reuse strategy.
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.typeOfMovement = params['type'];
    });
    
    this.createForm();
    this.getAccountsFromServer();
  }

  submit() {
    if (!this.form.valid || this.form.controls.category.hasError('required')) {
      console.log("form not valid");
      this.message("Preencha os campos obrigatórios!");
      return;
    }

    console.log(this.form.value);

    var movement = new Movement();
    movement.title = this.form.get("title").value;
    movement.description = this.form.get("description").value;
    movement.amount = this.form.get("amount").value;
    movement.category = this.categs[0];
    movement.type = this.form.get("type").value;
    movement.account = this.accounts[0];
    movement.fixedAmount = this.form.get("fixed").value;
    movement.date = this.form.get("date").value;
    movement.recurrent = this.form.get("recurrent").value;
    movement.frequency = this.form.get("frequency").value;
    movement.recurrenceTimes = this.form.get("recurrenceTimes").value;
    
    console.log(movement);

    this.movementService.save(movement)
      .subscribe( m => {
        if(m === undefined){
          this.message("Erro!");
          return;
        }
        
      });
    this.message("Movimento adicionado!");
  }


  message(message: string){
    this._snackBar.open(message, 'ok', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  cleanform(){
    this.createForm();
    this.categs = [];
  }

  ngOnDestroy() {
  }

  createForm(): void {
        //Here can be moved for and factory of movement group according to the typeOfMovement
        console.log("Building UI for " + this.typeOfMovement);
        switch (this.typeOfMovement) {
          case this.movementLayoutType.supermarket: {
            this.form = this.formBuilder.group({
              title: { value: "Mercado", disabled: true },
              description: { value: "Compra supermercado", disabled: true },
              date: new Date(),
              amount: [null, Validators.required],
              type: this.movementTpe.EXPENSE,
              category: new Category(), 
              account: new Account(),
              fixed: true,
              recurrent: false,
              frequency: null,
              recurrenceTimes: []
            });
            this.removable =  false;
            this.getCategoriesFromServer(this.movementTpe.EXPENSE);
            break;
          }
          case this.movementLayoutType.income: {
            this.form = this.formBuilder.group({
              title: ['', Validators.required],
              description: [],
              date: new Date(),
              amount: [null, Validators.required],
              type: this.movementTpe.INCOME,
              category: [null, Validators.required], 
              account: new Account(),
              fixed: true,
              recurrent: false,
              frequency: [],
              recurrenceTimes: []
            });


            this.getCategoriesFromServer(this.movementTpe.INCOME);
            break;
          }
          case this.movementLayoutType.expense_fixed: {
            this.form = this.formBuilder.group({
              title: ['', Validators.required],
              description: [],
              date: new Date(),
              amount: [null, Validators.required],
              type: this.movementTpe.EXPENSE,
              category: [null, Validators.required], 
              account: new Account(),
              fixed: true,
              recurrent: true,
              frequency: [Validators.required],
              recurrenceTimes: []
            });


            this.getCategoriesFromServer(this.movementTpe.EXPENSE);
            break;
          }
          default: {
            this.form = this.formBuilder.group({
              title: ['', Validators.required],
              description: [],
              date: new Date(),
              amount: [null, Validators.required],
              type: this.movementTpe.EXPENSE,
              category: [null, Validators.required], 
              account: new Account(),
              fixed: false,
              recurrent: false,
              frequency: [],
              recurrenceTimes: []
            });




            this.getCategoriesFromServer(this.movementTpe.EXPENSE);
            break;
          }
        }
  }

  getCategoriesFromServer(type: MovementType): void {
    this.categoryService.getAllByType(type)
      .subscribe(categories => {
        console.log(categories);

        this.filteredCateg = this.categCtrl.valueChanges.pipe(
          startWith(null),
          map((categ: Category | null) => categ ? this._filterCateg(categ) : this.allCategs));

        categories.forEach(c => {
          // console.log(c.name);
          if (this.typeOfMovement == this.movementLayoutType.supermarket &&
               c.name.toLowerCase() == 'supermarket'){
                 console.log("found");
              this.categs.push(c);
          }
        })
        return this.allCategs = categories;
      });
  }

  getAccountsFromServer(): void {
    this.accountService.getAll()
      .subscribe(accounts => {
        console.log(accounts);
        
        this.filteredAccount = this.accountCtrl.valueChanges.pipe(
          startWith(null),
          map((account: Account | null) => account ? this._filterAccount(account) : this.allAccounts));
 
          accounts.forEach(ac => {
          // console.log(ac.name);
          if (ac.name.toLowerCase() == 'activo'){
                  console.log("found");
            this.accounts.push(ac);
          }
        })
        return this.allAccounts = accounts;
      });
  }

  removeCateg(categ: Category): void {
    const index = this.categs.indexOf(categ);
    if (index >= 0) {
      this.categs.splice(index, 1);
    }
  }

  selectedCateg(event: MatAutocompleteSelectedEvent): void {
    console.log("selectedCateg => " + event.option.viewValue)
    let value = event.option.viewValue;
    var categToPush:Category = this.allCategs.find(categ => categ.name == value);
    if (this.categs.length == 0) {
      console.log("adding => " + categToPush);
      this.categs.push(categToPush);
      this.categInput.nativeElement.value = '';
      this.form.patchValue({
        category: value
      });
    }
  }

  private _filterCateg(value: Category): Category[] {
    console.log("_filterCateg => " +  value.name);
    return this.allCategs.filter(categ => categ.id.indexOf(value.id) === 0);
  }

  removeAccount(account: Account): void {
    const index = this.accounts.indexOf(account);
    if (index >= 0) {
      this.accounts.splice(index, 1);
    }
  }

  selectedAccount(event: MatAutocompleteSelectedEvent): void {
    console.log("selectedAccount => " + event.option.viewValue)
    let value = event.option.viewValue;
    var accountToPush:Account = this.allAccounts.find(acc => acc.name == value);
    if (this.accounts.length == 0) {
      this.accounts.push(accountToPush);
      this.accountInput.nativeElement.value = '';
      this.form.patchValue({
        account: value
      });
    }
  }

  private _filterAccount(value: Account): Account[] {
    console.log("_filterAccount => " +  value.name);
    return this.allAccounts.filter(acc => acc.name.indexOf(value.name) === 0);
  }

}
