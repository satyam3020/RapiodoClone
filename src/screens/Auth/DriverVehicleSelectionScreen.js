import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const VEHICLES = [
    { id: 'bike', label: 'बाइक', icon: 'motorbike' },
    { id: 'auto', label: 'ऑटो', icon: 'rickshaw' },
    { id: 'cab', label: 'कैब', icon: 'car-side' },
];

export default function DriverVehicleSelectionScreen({ navigation }) {
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
                        <Ionicons name="arrow-back" size={28} color="black" />
                        <Text style={styles.headerTitle}>वाहन को चुनें</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpButton}>
                        <Ionicons name="headset" size={16} color="black" />
                        <Text style={styles.helpText}>हेल्प</Text>
                    </TouchableOpacity>
                </View>

                {/* Vehicle List */}
                <ScrollView contentContainerStyle={styles.listContainer}>
                    {VEHICLES.map((vehicle) => (
                        <TouchableOpacity
                            key={vehicle.id}
                            style={[
                                styles.vehicleCard,
                                selectedVehicle === vehicle.id && styles.selectedCard
                            ]}
                            onPress={() => setSelectedVehicle(vehicle.id)}
                        >
                            <View style={styles.iconContainer}>
                                <MaterialCommunityIcons
                                    name={vehicle.icon}
                                    size={40}
                                    color={vehicle.id === 'auto' ? '#4CAF50' : '#424242'} // Auto is green/yellow in screenshot
                                />
                            </View>
                            <Text style={styles.vehicleLabel}>{vehicle.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.confirmButton,
                            selectedVehicle && styles.confirmButtonActive
                        ]}
                        disabled={!selectedVehicle}
                        onPress={() => {
                            if (selectedVehicle) navigation.navigate('DriverDocumentUpload');
                        }}
                    >
                        <Text style={[
                            styles.confirmButtonText,
                            selectedVehicle && styles.confirmButtonTextActive
                        ]}>वाहन चुनें</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    helpText: {
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 16,
    },
    listContainer: {
        paddingTop: 10,
    },
    vehicleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    selectedCard: {
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    iconContainer: {
        width: 60,
        alignItems: 'center',
    },
    vehicleLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 20,
    },
    footer: {
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#E0E0E0', // Greyed out initially
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
    },
    confirmButtonActive: {
        backgroundColor: Colors.primary, // Yellow when selected
    },
    confirmButtonText: {
        color: '#9E9E9E',
        fontSize: 18,
        fontWeight: 'bold',
    },
    confirmButtonTextActive: {
        color: '#000000',
    }
});
