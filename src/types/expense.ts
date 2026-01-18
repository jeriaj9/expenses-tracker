export interface Expense {
    id: string;
    title: string;
    amount: number;
    date: string; // ISO string
    type: 'income' | 'expense';
}

export type ExpenseType = 'income' | 'expense';
