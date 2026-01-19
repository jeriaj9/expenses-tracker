import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Expense } from '../types/expense';
import { ExpenseListItem } from './ExpenseListItem';

interface Props {
    expenses: Expense[];
    onExpensePress: (id: string) => void;
}

export const ExpensesList: React.FC<Props> = ({ expenses, onExpensePress }) => {
    if (expenses.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No expenses found.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ExpenseListItem expense={item} onPress={onExpensePress} />
            )}
            contentContainerStyle={[styles.list, { paddingBottom: 100 }]}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },
    emptyContainer: {
        padding: 32,
        alignItems: 'center',
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
    },
});
