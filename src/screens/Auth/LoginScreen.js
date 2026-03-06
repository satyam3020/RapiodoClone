import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import { RapidoButton } from '../../components/RapidoButton';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation, route }) {
    const { role } = route.params || { role: 'user' };
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleNext = () => {
        if (phoneNumber.length >= 10) {
            navigation.navigate('UserOTP', { phone: phoneNumber });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {/* Dark Blue Header Section with Logo and Illustration */}
                <View style={styles.headerSection}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.helpButton}>
                            <Ionicons name="help-circle-outline" size={18} color="black" />
                            <Text style={styles.helpText}>Help</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.logoText}>rapido</Text>
                    {/* Placeholder for the vehicle illustrations */}
                    <View style={styles.illustrationContainer}>
                        <Ionicons name="bicycle" size={60} color="#FFC107" style={styles.iconShift} />
                        <Ionicons name="car" size={80} color="#E0E0E0" style={{ zIndex: -1 }} />
                        <Ionicons name="bus" size={70} color="#FF9800" style={styles.iconShiftReverse} />
                    </View>
                </View>

                {/* White Content Card */}
                <View style={styles.contentCard}>
                    <View style={styles.contentInner}>
                        <Text style={styles.title}>What's your number?</Text>

                        <View style={styles.inputContainer}>
                            <View style={styles.phonePrefix}>
                                <Text style={styles.prefixText}>+91</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="0000000000"
                                placeholderTextColor="#9E9E9E"
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                autoFocus
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.terms}>
                            By continuing, you confirm that you are 18 years of age{'\n'}
                            and agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.nextButton,
                                phoneNumber.length >= 10 ? styles.nextButtonActive : styles.nextButtonInactive
                            ]}
                            onPress={handleNext}
                            disabled={phoneNumber.length < 10}
                        >
                            <Text style={[
                                styles.nextButtonText,
                                phoneNumber.length >= 10 ? styles.nextButtonTextActive : styles.nextButtonTextInactive
                            ]}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E2B4D', // Dark blue background matching screenshot
    },
    headerSection: {
        height: height * 0.35,
        backgroundColor: '#1E2B4D',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    helpText: {
        fontWeight: 'bold',
        marginLeft: 4,
        color: '#000',
    },
    logoText: {
        fontSize: 40,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1,
        marginBottom: 20,
    },
    illustrationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
    },
    iconShift: {
        transform: [{ translateX: 20 }, { translateY: 10 }],
        zIndex: 1,
    },
    iconShiftReverse: {
        transform: [{ translateX: -20 }],
        zIndex: 2,
    },
    contentCard: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Slight off-white/greyish tint like the screenshot
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    contentInner: {
        padding: 24,
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B0BEC5',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: '#FFFFFF',
    },
    phonePrefix: {
        marginRight: 10,
    },
    prefixText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        fontWeight: '500',
        padding: 0,
    },
    footer: {
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    },
    terms: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 12,
        marginBottom: 20,
        lineHeight: 18,
    },
    linkText: {
        color: '#1A73E8',
        fontWeight: '500',
    },
    nextButton: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonActive: {
        backgroundColor: '#FFD501',
    },
    nextButtonInactive: {
        backgroundColor: '#E0E0E0',
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextButtonTextActive: {
        color: '#000000',
    },
    nextButtonTextInactive: {
        color: '#9E9E9E',
    }
});
