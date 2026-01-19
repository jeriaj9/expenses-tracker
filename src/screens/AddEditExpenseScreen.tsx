import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useExpenseStore } from '../store/useExpenseStore';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseFormButton } from '../components/ExpenseFormButton';
import { Expense } from '../types/expense';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEditExpense'>;

export const AddEditExpenseScreen: React.FC<Props> = ({ navigation, route }) => {
    const { expenseId } = route.params;
    const { addExpense, updateExpense, getExpenseById, removeExpense } = useExpenseStore();

    const existingExpense = expenseId ? getExpenseById(expenseId) : undefined;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseId ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, expenseId]);

    if (expenseId && !existingExpense) {
        // Edge case: ID passed but not found (e.g. deleted)
        // Should probably navigation.goBack() but let's just render null/error to be safe or pop
        navigation.goBack();
        return null;
    }

    const handleSubmit = (data: any) => {
        if (existingExpense) {
            updateExpense(existingExpense.id, data);
        } else {
            const newExpense: Expense = {
                id: uuidv4(),
                ...data,
                amount: parseFloat(data.amount),
            };
            addExpense(newExpense);
        }
        navigation.goBack();
    };

    const handleDelete = () => {
        if (existingExpense) {
            removeExpense(existingExpense.id);
            navigation.goBack();
        }
    }

    return (
        <ScrollView style={styles.container}>
            <ExpenseForm
                initialValues={
                    existingExpense
                        ? {
                            title: existingExpense.title,
                            amount: existingExpense.amount.toString(),
                            date: existingExpense.date,
                            type: existingExpense.type,
                        }
                        : undefined
                }
                onSubmit={handleSubmit}
                submitLabel={existingExpense ? 'Update' : 'Add'}
            />
            {existingExpense && (
                <View style={{ marginTop: 16 }}>
                    <ExpenseFormButton
                        label="Delete Expense"
                        onPress={handleDelete}
                        isDestructive
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
});
