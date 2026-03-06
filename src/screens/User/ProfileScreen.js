import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../context/AppContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const MENU_ITEMS = [
    { id: '1', title: 'Help', icon: 'help-circle-outline' },
    { id: '2', title: 'My Rides', icon: 'time-outline' },
    { id: '3', title: 'Safety', icon: 'shield-checkmark-outline' },
    { id: '4', title: 'Notifications', icon: 'notifications-outline' },
];

export default function ProfileScreen({ navigation }) {
    const { setUser, setRole } = useContext(AppContext);

    const handleLogout = () => {
        setUser(null);
        setRole(null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* User Info Card */}
                <View style={styles.userCard}>
                    <TouchableOpacity style={styles.userInfoRow}>
                        <View style={styles.avatarContainer}>
                            <Ionicons name="person" size={24} color="#667085" />
                            {/* Blue circular border simulation */}
                            <View style={styles.avatarRing} />
                        </View>
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>Mukesh Vishwakarma</Text>
                            <Text style={styles.userPhone}>8568888855</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#1E2B4D" />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.ratingRow}>
                        <Ionicons name="star" size={20} color="#FFC107" />
                        <Text style={styles.ratingText}>4.86 My Rating</Text>
                        <Ionicons name="chevron-forward" size={20} color="#1E2B4D" />
                    </TouchableOpacity>
                </View>

                {/* Menu Items */}
                <View style={styles.menuList}>
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => {
                                if (item.title === 'Help') navigation.navigate('Help');
                                else if (item.title === 'My Rides') navigation.navigate('MyRides');
                                else if (item.title === 'Safety') navigation.navigate('Safety');
                                else if (item.title === 'Notifications') navigation.navigate('Notification');
                            }}
                        >
                            <View style={styles.menuIconContainer}>
                                <Ionicons name={item.icon} size={22} color="#1E2B4D" />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#1E2B4D" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Earn Money Banner */}
                <View style={styles.earnBanner}>
                    <View style={styles.earnContent}>
                        <Text style={styles.earnTitle}>Earn money with Rapido</Text>
                        <Text style={styles.earnSubtitle}>Become a Captain!</Text>
                    </View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=200' }}
                        style={styles.earnImage}
                    />
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#D32F2F" style={{ marginRight: 10 }} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Bottom Nav */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
                    <Ionicons name="navigate-outline" size={24} color="#757575" />
                    <Text style={styles.navText}>Ride</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyRides')}>
                    <Ionicons name="car-outline" size={24} color="#757575" />
                    <Text style={styles.navText}>My Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Notification')}>
                    <Ionicons name="notifications-outline" size={24} color="#757575" />
                    <Text style={styles.navText}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="person" size={24} color="#000" />
                    <Text style={[styles.navText, { color: '#000', fontWeight: 'bold' }]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000000',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    userCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E4E7EC',
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    avatarRing: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#1E2B4D',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        transform: [{ rotate: '45deg' }],
    },
    userDetails: {
        flex: 1,
        marginLeft: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    userPhone: {
        fontSize: 14,
        color: '#667085',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#F2F4F7',
        marginVertical: 15,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    menuList: {
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuIconContainer: {
        width: 30,
        alignItems: 'center',
    },
    menuTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    menuSubtitle: {
        fontSize: 12,
        color: '#757575',
        marginTop: 4,
    },
    earnBanner: {
        backgroundColor: '#FFF8E1',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#FFF3E0',
    },
    earnContent: {
        flex: 1,
        padding: 20,
    },
    earnTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    earnSubtitle: {
        fontSize: 14,
        color: '#424242',
        marginTop: 4,
    },
    earnImage: {
        width: 120,
        height: '100%',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
    navText: {
        fontSize: 10,
        color: '#757575',
        marginTop: 4,
    }
});
