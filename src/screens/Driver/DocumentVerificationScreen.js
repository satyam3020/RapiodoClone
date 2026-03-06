import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function DocumentVerificationScreen({ navigation }) {
    const { setUser, user } = useContext(AppContext);
    const [rcUploaded, setRcUploaded] = useState(false);
    const [dlUploaded, setDlUploaded] = useState(false);

    const handleUpload = (type) => {
        // Simulate image picker delay
        setTimeout(() => {
            if (type === 'rc') setRcUploaded(true);
            if (type === 'dl') setDlUploaded(true);
            Alert.alert('Success', `${type.toUpperCase()} Document Uploaded!`);
        }, 1000);
    };

    const handleSubmit = () => {
        if (!rcUploaded || !dlUploaded) {
            Alert.alert('Error', 'Please upload both Registration Certificate and Driving License.');
            return;
        }

        // Update user context to verified
        setUser({ ...user, isVerified: true });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Partner Verification</Text>
            <Text style={styles.subtitle}>Upload documents to start earning with VahaniQ</Text>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons name="document-text" size={24} color="#333" />
                    <Text style={styles.cardTitle}>Registration Certificate (RC)</Text>
                </View>
                <Text style={styles.cardDesc}>Upload a clear photo of your vehicle's RC front side.</Text>

                <TouchableOpacity
                    style={[styles.uploadBtn, rcUploaded && styles.uploadedBtn]}
                    onPress={() => handleUpload('rc')}
                >
                    <Ionicons name={rcUploaded ? "checkmark-circle" : "cloud-upload"} size={20} color={rcUploaded ? "#34a853" : "#1a73e8"} />
                    <Text style={[styles.uploadText, rcUploaded && { color: '#34a853' }]}>
                        {rcUploaded ? 'RC Uploaded' : 'Upload RC Photo'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons name="card" size={24} color="#333" />
                    <Text style={styles.cardTitle}>Driving License (DL)</Text>
                </View>
                <Text style={styles.cardDesc}>Upload a clear photo of your valid Driving License.</Text>

                <TouchableOpacity
                    style={[styles.uploadBtn, dlUploaded && styles.uploadedBtn]}
                    onPress={() => handleUpload('dl')}
                >
                    <Ionicons name={dlUploaded ? "checkmark-circle" : "cloud-upload"} size={20} color={dlUploaded ? "#34a853" : "#1a73e8"} />
                    <Text style={[styles.uploadText, dlUploaded && { color: '#34a853' }]}>
                        {dlUploaded ? 'DL Uploaded' : 'Upload DL Photo'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.submitBtn, (!rcUploaded || !dlUploaded) && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={!rcUploaded || !dlUploaded}
            >
                <Text style={styles.submitText}>Submit for Verification</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    cardDesc: {
        color: '#666',
        marginBottom: 20,
        lineHeight: 20,
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1a73e8',
        borderRadius: 8,
        padding: 12,
        borderStyle: 'dashed',
    },
    uploadedBtn: {
        borderColor: '#34a853',
        backgroundColor: '#e6f4ea',
        borderStyle: 'solid',
    },
    uploadText: {
        color: '#1a73e8',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    submitBtn: {
        backgroundColor: '#34a853',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    submitBtnDisabled: {
        backgroundColor: '#ccc',
    },
    submitText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
