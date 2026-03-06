import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function DriverOTPScreen({ navigation }) {
    const [timer, setTimer] = useState(26);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Simulating auto-verify when OTP is "entered" (timer completes or user types)
    const simulateVerify = () => {
        navigation.navigate('DriverCitySelection');
    };

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
                            <Ionicons name="chatbubble-ellipses" size={24} color={Colors.secondary} />
                        </View>
                    </View>
                </View>

                {/* Title & Timer */}
                <View style={styles.titleRow}>
                    <Text style={styles.title}>ओटीपी दर्ज करे</Text>
                    <Text style={styles.timer}>00:{timer < 10 ? `0${timer}` : timer}</Text>
                </View>

                {/* OTP Boxes (Visual Only for Demo) */}
                <View style={styles.otpContainer}>
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <TextInput
                            key={idx}
                            style={styles.otpBox}
                            maxLength={1}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                if (idx === 6 && text.length === 1) {
                                    simulateVerify();
                                }
                            }}
                        />
                    ))}
                </View>

                {/* Auto redirect button for demo purposes */}
                <TouchableOpacity onPress={simulateVerify} style={styles.demoButton}>
                    <Text style={styles.demoText}>Skip to City (Demo)</Text>
                </TouchableOpacity>

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
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
    },
    timer: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#757575',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    otpBox: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 4,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    demoButton: {
        marginTop: 50,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },
    demoText: {
        color: '#999',
    }
});
