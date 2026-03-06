import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

export const GlobalStyles = StyleSheet.create({
    card: {
        backgroundColor: Colors.background,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    roundedButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.secondary,
    }
});
