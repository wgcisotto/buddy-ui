import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  category: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {category: 'Supermecado', name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {category: 'Luz', name: 'Helium', weight: 4.0026, symbol: 'He'},
  {category: 'Agua', name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {category: 'Internet', name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {category: 'Telefone', name: 'Boron', weight: 10.811, symbol: 'B'},
  {category: 'Arrendamento ', name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {category: 'Saúde / Farmácia', name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {category: 'Itens Casa', name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {category: 'Transporte ', name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {category: 'Educação ', name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {category: 'Outros', name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {category: 'Gasto', name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {category: 'Recebido', name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {category: 'Sobra', name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['category', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
