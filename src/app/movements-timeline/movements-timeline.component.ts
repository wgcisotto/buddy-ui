import { Component, OnInit } from '@angular/core';

export interface Movements {
  date: string;
  category: string;
  categoryIcon: string;
  type: string;
  amount: string;
}

const ELEMENT_DATA: Movements[] = [
  {category: 'Supermecado', categoryIcon: 'restaurant', date: '01/09/2020', type: "EXPENSE", amount: '100.00'},
  {category: 'Salary', categoryIcon: 'euro', date: '01/09/2020', type: "INCOME", amount: '200.00'},
  {category: 'Agua',categoryIcon: 'shopping_cart', date: '01/09/2020', type: "EXPENSE", amount: '23.54'}
];

@Component({
  selector: 'movements-timeline',
  templateUrl: './movements-timeline.component.html',
  styleUrls: ['./movements-timeline.component.css']
})
export class MovementsTimelineComponent implements OnInit {

  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  movements = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
