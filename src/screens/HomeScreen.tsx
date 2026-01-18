import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useExpenseStore } from '../store/useExpenseStore';
import { ExpensesList } from '../components/ExpensesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { StatusBar } from 'expo-status-bar';
import { formatCurrency } from '../utils/currency';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const expenses = useExpenseStore((state) => state.expenses);

    const { totalBalance, totalIncome, totalExpense } = useMemo(() => {
        return expenses.reduce(
            (acc, curr) => {
                if (curr.type === 'income') {
                    acc.totalIncome += curr.amount;
                    acc.totalBalance += curr.amount;
                } else {
                    acc.totalExpense += curr.amount;
                    acc.totalBalance -= curr.amount;
                }
                return acc;
            },
            { totalBalance: 0, totalIncome: 0, totalExpense: 0 }
        );
    }, [expenses]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Expenses</Text>
                <View style={styles.summaryCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={[styles.balanceAmount, totalBalance < 0 && styles.negative]}>
                        ${formatCurrency(totalBalance)}
                    </Text>
                    <View style={styles.statsRow}>
                        <View>
                            <Text style={styles.statLabel}>Income</Text>
                            <Text style={styles.income}>+${formatCurrency(totalIncome)}</Text>
                        </View>
                        <View>
                            <Text style={styles.statLabel}>Expense</Text>
                            <Text style={styles.expense}>-${formatCurrency(totalExpense)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.listHeader}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                </View>
                <ExpensesList
                    expenses={expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                    onExpensePress={(id) => navigation.navigate('AddEditExpense', { expenseId: id })}
                />
            </View>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddEditExpense', {})}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    summaryCard: {
        backgroundColor: '#2196F3',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#2196F3',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    balanceLabel: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginBottom: 4,
    },
    balanceAmount: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    negative: {
        color: '#ffcdd2',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        paddingTop: 16,
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    income: {
        color: '#E8F5E9',
        fontSize: 16,
        fontWeight: '600',
    },
    expense: {
        color: '#FFEBEE',
        fontSize: 16,
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    listHeader: {
        padding: 16,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2196F3',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    fabIcon: {
        fontSize: 32,
        color: 'white',
        marginTop: -4,
    },
});
