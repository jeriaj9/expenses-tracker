import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ExpenseType } from '../types/expense';

interface ExpenseFormData {
    title: string;
    amount: string;
    date: string;
    type: ExpenseType;
}

interface Props {
    initialValues?: ExpenseFormData;
    onSubmit: (data: ExpenseFormData) => void;
    submitLabel: string;
}

export const ExpenseForm: React.FC<Props> = ({ initialValues, onSubmit, submitLabel }) => {
    const [title, setTitle] = useState(initialValues?.title || '');
    const [amount, setAmount] = useState(initialValues?.amount || '');
    const [type, setType] = useState<ExpenseType>(initialValues?.type || 'expense');

    // Simple date handling for now (YYYY-MM-DD)
    const [date, setDate] = useState(initialValues?.date || new Date().toISOString().split('T')[0]);

    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert('Validation Error', 'Title is required');
            return;
        }

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            Alert.alert('Validation Error', 'Please enter a valid positive amount');
            return;
        }

        if (!date.trim()) {
            Alert.alert('Validation Error', 'Date is required');
            return;
        }

        onSubmit({ title, amount, date, type });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Type</Text>
            <View style={styles.typeContainer}>
                <TouchableOpacity
                    style={[styles.typeButton, type === 'expense' && styles.activeTypeExpense]}
                    onPress={() => setType('expense')}
                >
                    <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.typeButton, type === 'income' && styles.activeTypeIncome]}
                    onPress={() => setType('income')}
                >
                    <Text style={[styles.typeText, type === 'income' && styles.activeTypeText]}>Income</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Groceries"
            />

            <Text style={styles.label}>Amount ($)</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
            <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
            />

            <ExpenseFormButton label={submitLabel} onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    typeContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },
    typeButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    activeTypeExpense: {
        backgroundColor: '#ffebee',
        borderColor: '#F44336',
    },
    activeTypeIncome: {
        backgroundColor: '#e8f5e9',
        borderColor: '#4CAF50',
    },
    typeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    activeTypeText: {
        color: '#333',
        fontWeight: '700',
    },
});
