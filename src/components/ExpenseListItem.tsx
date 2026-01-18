import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Expense } from '../types/expense';
import { formatCurrency } from '../utils/currency';

interface Props {
    expense: Expense;
    onPress: (id: string) => void;
}

export const ExpenseListItem: React.FC<Props> = ({ expense, onPress }) => {
    const isIncome = expense.type === 'income';

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(expense.id)}>
            <View style={styles.info}>
                <Text style={styles.title}>{expense.title}</Text>
                <Text style={styles.date}>{new Date(expense.date).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
                {isIncome ? '+' : '-'}${formatCurrency(expense.amount)}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: '700',
    },
    income: {
        color: '#4CAF50',
    },
    expense: {
        color: '#F44336',
    },
});
