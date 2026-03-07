import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const RapidoButton = ({ title, onPress, style, textStyle, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.button, style, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 12, // VahaniQ uses slightly rounded but distinct corners
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    disabled: {
        backgroundColor: '#E0E0E0',
    },
    text: {
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
