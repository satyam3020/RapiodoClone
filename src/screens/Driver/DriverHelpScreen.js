import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DriverHelpScreen({ navigation }) {
    const listItems = [
        { id: 1, title: 'शुरू करना', icon: 'rocket', iconColor: '#FFA000', bgColor: '#FFF8E1' },
        { id: 2, title: 'आसपास की डिमांड लोकेशन', icon: 'location', iconColor: '#D32F2F', bgColor: '#FFEBEE' },
        { id: 3, title: 'अर्निंग', icon: 'cash', iconColor: '#388E3C', bgColor: '#E8F5E9' },
        { id: 4, title: 'मनी ट्रांसफर', icon: 'wallet', iconColor: '#FBC02D', bgColor: '#FFFDE7' },
        { id: 5, title: 'खाता और सर्विस मैनेजमेंट', icon: 'person', iconColor: '#D32F2F', bgColor: '#FFF3E0' },
        { id: 6, title: 'ऐप की समस्याएँ', icon: 'phone-portrait', iconColor: '#424242', bgColor: '#F5F5F5' },
        { id: 7, title: 'आपात-स्थिति', icon: 'warning', iconColor: '#D32F2F', bgColor: '#FFEBEE' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>सहायता</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#757575" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search your queries"
                        placeholderTextColor="#9E9E9E"
                    />
                </View>

                {/* Ride Help Section */}
                <Text style={styles.sectionTitle}>राइड के लिए मदद चाहिए?</Text>

                <View style={styles.rideCard}>
                    <View style={styles.rideCardHeader}>
                        <Text style={styles.rideType}>ऑटो</Text>
                        <Text style={styles.ridePrice}>₹232</Text>
                    </View>
                    <Text style={styles.rideTime}>05 मार्च, 06:27 pm</Text>

                    <View style={styles.divider} />

                    <View style={styles.locationRow}>
                        <View style={[styles.dot, styles.dotGreen]} />
                        <Text style={styles.locationText} numberOfLines={1}>Sona Udyog Industrial Estate, 11, Parsi P...</Text>
                    </View>
                    <View style={styles.locationRow}>
                        <View style={[styles.dot, styles.dotRed]} />
                        <Text style={styles.locationText} numberOfLines={1}>Rajendra Villa, Rd Number 7, Daulat Nag...</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.viewAllRides}>
                    <Text style={styles.viewAllText}>सभी राइड देखें</Text>
                    <Ionicons name="chevron-forward" size={18} color="#757575" />
                </TouchableOpacity>

                {/* General Topics Section */}
                <Text style={styles.sectionTitle}>सामान्य विषय</Text>

                <View style={styles.topicsList}>
                    {listItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.topicItem}>
                            <View style={[styles.iconBg, { backgroundColor: item.bgColor }]}>
                                <Ionicons name={item.icon} size={24} color={item.iconColor} />
                            </View>
                            <Text style={styles.topicTitle}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Contact Support Button */}
                <TouchableOpacity style={styles.supportButton}>
                    <Text style={styles.supportButtonText}>सहयोग टीम से संपर्क करें</Text>
                </TouchableOpacity>

                {/* Training Videos Banner */}
                <View style={styles.videoBanner}>
                    <View style={styles.videoTextCol}>
                        <Text style={styles.videoTitle}>Training Videos</Text>
                        <TouchableOpacity style={styles.watchButton}>
                            <Text style={styles.watchText}>Watch Videos</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playIconContainer}>
                        <Ionicons name="play-circle" size={80} color="#FFFFFF" />
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 50,
        marginBottom: 24,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#212121',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    rideCard: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        elevation: 1,
    },
    rideCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    rideType: {
        fontSize: 16,
        color: '#424242',
    },
    ridePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    rideTime: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginBottom: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    dotGreen: {
        backgroundColor: '#4CAF50',
    },
    dotRed: {
        backgroundColor: '#F44336',
    },
    locationText: {
        fontSize: 14,
        color: '#424242',
        flex: 1,
    },
    viewAllRides: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    viewAllText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A73E8',
    },
    topicsList: {
        marginBottom: 20,
    },
    topicItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    iconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    topicTitle: {
        flex: 1,
        fontSize: 16,
        color: '#424242',
    },
    supportButton: {
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    supportButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    videoBanner: {
        backgroundColor: '#4F5B66',
        borderRadius: 8,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    videoTextCol: {
        flex: 1,
    },
    videoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    watchButton: {
        backgroundColor: '#FFD501',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    watchText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    playIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    }
});
