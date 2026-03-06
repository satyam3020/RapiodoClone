import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

export const RapidoHeader = ({ onSearchPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.searchBar} onPress={onSearchPress}>
                <Ionicons name="search" size={20} color={Colors.textLight} />
                <Text style={styles.searchPlaceholder}>Enter pickup location</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primary,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    searchBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchPlaceholder: {
        marginLeft: 10,
        color: Colors.textLight,
        fontSize: 16,
    },
});
