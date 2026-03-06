import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { RapidoButton } from '../../components/RapidoButton';

const { width, height } = Dimensions.get('window');

export default function RoleSelectionScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Simulated Captain Image/Banner */}
                <View style={styles.bannerContainer}>
                    {/* Dark gradient overlay simulation */}
                    <View style={styles.overlay}>
                        <View style={styles.header}>
                            <View style={styles.logoBadge}>
                                <Text style={styles.logoBadgeText}>VahaniQ</Text>
                            </View>
                            <Text style={styles.partnerText}>Partner</Text>
                        </View>

                        <View style={styles.bannerTextContent}>
                            <Text style={styles.mainTitle}>ड्राइव करें और कमाएं</Text>
                            <Text style={styles.subTitle}>महीने के ₹30000 तक</Text>

                            <RapidoButton
                                title="ड्राइविंग शुरू करें"
                                onPress={() => navigation.navigate('DriverLogin', { role: 'driver' })}
                                style={styles.driveButton}
                                textStyle={styles.driveButtonText}
                            />
                        </View>
                        {/* Pagination dots simulation */}
                        <View style={styles.dots}>
                            <View style={[styles.dot, styles.activeDot]} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                    </View>
                </View>

                {/* Separator */}
                <Text style={styles.orText}>या</Text>

                {/* Customer Card */}
                <View style={styles.customerCardContainer}>
                    <TouchableOpacity
                        style={styles.customerCard}
                        onPress={() => navigation.navigate('Login', { role: 'user' })}
                    >
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerTitle}>ग्राहक?</Text>
                            <Text style={styles.customerSubtitle}>राइड बुक करें</Text>
                            <Ionicons name="arrow-forward" size={20} color={Colors.mapLine} style={{ marginTop: 5 }} />
                        </View>
                        <View style={styles.customerImagePlaceholder}>
                            <Ionicons name="person" size={50} color={Colors.border} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    bannerContainer: {
        height: height * 0.65,
        backgroundColor: Colors.secondary, // Fallback dark blue matching the image
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    overlay: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    logoBadge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginRight: 6,
    },
    logoBadgeText: {
        fontSize: 12,
        fontWeight: '900',
        color: Colors.secondary,
    },
    partnerText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    bannerTextContent: {
        marginTop: 'auto',
        marginBottom: 30,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'black',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    subTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 24,
        marginTop: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5
    },
    driveButton: {
        borderRadius: 30,
    },
    driveButtonText: {
        color: '#000000',
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#FFFFFF',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#757575',
        fontWeight: 'bold',
    },
    customerCardContainer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    customerCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    customerInfo: {
        flex: 1,
    },
    customerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    customerSubtitle: {
        fontSize: 16,
        color: Colors.mapLine, // Blue text as seen in screenshot
        marginTop: 2,
        fontWeight: '600',
    },
    customerImagePlaceholder: {
        width: 100,
        height: 80,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
