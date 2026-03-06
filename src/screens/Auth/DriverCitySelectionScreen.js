import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RapidoButton } from '../../components/RapidoButton';

export default function DriverCitySelectionScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpButton}>
                        <Ionicons name="headset" size={16} color="black" />
                        <Text style={styles.helpText}>हेल्प</Text>
                    </TouchableOpacity>
                </View>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarRings}>
                        <View style={styles.avatarInner}>
                            {/* Pin drop hand image simulation */}
                            <View style={styles.pinSim}>
                                <View style={styles.handLine} />
                                <View style={styles.pinHead} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>आप किस शहर में राइड करना चाहते हैं?</Text>

                {/* City Card */}
                <View style={styles.cityCard}>
                    <Text style={styles.cardLabel}>आप यहाँ राइड करेंगे</Text>
                    <View style={styles.cityRow}>
                        <View style={styles.cityLeft}>
                            <Ionicons name="location" size={24} color="#1A73E8" />
                            <Text style={styles.cityName}>Mumbai</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.changeText}>परिवर्तन</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <RapidoButton
                        title="शहर कन्फर्म करें"
                        onPress={() => navigation.navigate('DriverVehicleSelection')}
                        style={styles.confirmButton}
                        textStyle={styles.confirmButtonText}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    avatarContainer: {
        marginBottom: 30,
    },
    avatarRings: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFECB3',
    },
    avatarInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFCC80',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinSim: {
        alignItems: 'center',
    },
    handLine: {
        width: 30,
        height: 10,
        backgroundColor: '#D84315', // hand color
        borderRadius: 5,
        marginBottom: -5,
        transform: [{ rotate: '-15deg' }]
    },
    pinHead: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#1A73E8',
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        marginBottom: 30,
        lineHeight: 32,
    },
    cityCard: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 20,
        backgroundColor: '#FAFAFA',
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#424242',
        marginBottom: 16,
    },
    cityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cityName: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
        marginLeft: 10,
    },
    changeText: {
        color: '#1A73E8',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    confirmButton: {
        borderRadius: 8,
    },
    confirmButtonText: {
        color: '#000',
        fontWeight: '500',
    }
});
