import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../types/expense';

interface ExpenseState {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
    updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
    getExpenseById: (id: string) => Expense | undefined;
}

export const useExpenseStore = create<ExpenseState>()(
    persist(
        (set, get) => ({
            expenses: [],
            addExpense: (expense) =>
                set((state) => ({ expenses: [...state.expenses, expense] })),
            removeExpense: (id) =>
                set((state) => ({
                    expenses: state.expenses.filter((e) => e.id !== id),
                })),
            updateExpense: (id, updatedExpense) =>
                set((state) => ({
                    expenses: state.expenses.map((e) =>
                        e.id === id ? { ...e, ...updatedExpense } : e
                    ),
                })),
            getExpenseById: (id) => get().expenses.find((e) => e.id === id),
        }),
        {
            name: 'expense-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
