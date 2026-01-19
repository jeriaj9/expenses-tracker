import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
    label: string;
    onPress: () => void;
    isDestructive?: boolean;
}

export const ExpenseFormButton: React.FC<Props> = ({ label, onPress, isDestructive }) => {
    return (
        <TouchableOpacity
            style={[styles.button, isDestructive ? styles.destructiveButton : styles.primaryButton]}
            onPress={onPress}
        >
            <Text style={[styles.text, isDestructive ? styles.destructiveText : styles.primaryText]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#2196F3',
    },
    destructiveButton: {
        backgroundColor: '#FFEBEE',
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryText: {
        color: 'white',
    },
    destructiveText: {
        color: '#D32F2F',
    },
});
