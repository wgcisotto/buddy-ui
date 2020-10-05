import { MovementType } from './enums/MovementType';
import { Category } from './Category';
import { Account } from 'src/app/models/Account';
export class Movement {
    id: string;
    title: string;
    description: string;
    date: Date;
    amount: number;
    type : MovementType;
    category: Category;
    account: Account;
    fixedAmount: boolean;
    recurrent: boolean;
    frequency: number;
    recurrenceTimes: number;
    currency: string = "EUR";
}