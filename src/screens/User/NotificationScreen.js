import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        title: 'Ride Completed! 🎉',
        message: 'Your ride from Andheri Station to Bandra Kurla Complex has been completed. Fare: ₹85.',
        time: '2 hours ago',
        type: 'ride',
        icon: 'checkmark-circle',
        iconColor: '#4CAF50',
        read: false,
    },
    {
        id: '2',
        title: '50% OFF on your next ride!',
        message: 'Use code RAPIDO50 to get 50% off (up to ₹75) on your next bike ride. Valid till 10 Mar.',
        time: '5 hours ago',
        type: 'offer',
        icon: 'pricetag',
        iconColor: '#FF9800',
        read: false,
    },
    {
        id: '3',
        title: 'Ride Cancelled',
        message: 'Your ride from Kandarpada to Dahisar Check Naka was cancelled. No charges applied.',
        time: '1 day ago',
        type: 'ride',
        icon: 'close-circle',
        iconColor: '#F44336',
        read: true,
    },
    {
        id: '4',
        title: 'Refer & Earn ₹50! 🎁',
        message: 'Invite your friends to Rapido and earn ₹50 for each referral. Share your code now!',
        time: '2 days ago',
        type: 'offer',
        icon: 'gift',
        iconColor: '#9C27B0',
        read: true,
    },
    {
        id: '5',
        title: 'Safety Update',
        message: 'We have enhanced safety features. Now share your live ride location with trusted contacts.',
        time: '3 days ago',
        type: 'info',
        icon: 'shield-checkmark',
        iconColor: '#2196F3',
        read: true,
    },
    {
        id: '6',
        title: 'Payment Successful ✅',
        message: 'Payment of ₹320 for your cab ride to Chhatrapati Shivaji Airport T2 was successful.',
        time: '4 days ago',
        type: 'payment',
        icon: 'wallet',
        iconColor: '#00BCD4',
        read: true,
    },
    {
        id: '7',
        title: 'New: Rapido Coins! 🪙',
        message: 'Earn Rapido Coins on every ride and redeem them for discounts. Start collecting now!',
        time: '5 days ago',
        type: 'info',
        icon: 'aperture',
        iconColor: '#FFC107',
        read: true,
    },
];

export default function NotificationScreen({ navigation }) {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    {unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
                {unreadCount > 0 && (
                    <TouchableOpacity onPress={markAllRead}>
                        <Text style={styles.markAllText}>Mark all read</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {notifications.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={60} color="#E0E0E0" />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                        <Text style={styles.emptySubtext}>We'll notify you about your rides and offers</Text>
                    </View>
                ) : (
                    notifications.map((notif) => (
                        <TouchableOpacity
                            key={notif.id}
                            style={[styles.notifCard, !notif.read && styles.notifCardUnread]}
                            onPress={() => markAsRead(notif.id)}
                            activeOpacity={0.7}
                        >
                            {!notif.read && <View style={styles.unreadDot} />}
                            <View style={[styles.notifIconContainer, { backgroundColor: notif.iconColor + '18' }]}>
                                <Ionicons name={notif.icon} size={22} color={notif.iconColor} />
                            </View>
                            <View style={styles.notifContent}>
                                <Text style={[styles.notifTitle, !notif.read && styles.notifTitleUnread]}>
                                    {notif.title}
                                </Text>
                                <Text style={styles.notifMessage} numberOfLines={2}>
                                    {notif.message}
                                </Text>
                                <Text style={styles.notifTime}>{notif.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
                    <Ionicons name="navigate-outline" size={24} color="#757575" />
                    <Text style={styles.navText}>Ride</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyRides')}>
                    <Ionicons name="car-outline" size={24} color="#757575" />
                    <Text style={styles.navText}>My Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="notifications" size={24} color="#000" />
                    <Text style={[styles.navText, { color: '#000', fontWeight: 'bold' }]}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person-outline" size={24} color="#757575" />
                    <Text style={styles.navText}>Profile</Text>
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
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000000',
    },
    unreadBadge: {
        backgroundColor: '#F44336',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        paddingHorizontal: 6,
    },
    unreadBadgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    markAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A73E8',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 90,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#BDBDBD',
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#BDBDBD',
        marginTop: 6,
    },
    notifCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        marginBottom: 10,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        position: 'relative',
    },
    notifCardUnread: {
        backgroundColor: '#F8FAFF',
        borderColor: '#E3ECFA',
    },
    unreadDot: {
        position: 'absolute',
        top: 18,
        left: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1A73E8',
    },
    notifIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    notifContent: {
        flex: 1,
    },
    notifTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#424242',
        marginBottom: 4,
    },
    notifTitleUnread: {
        color: '#000',
        fontWeight: 'bold',
    },
    notifMessage: {
        fontSize: 13,
        color: '#757575',
        lineHeight: 18,
        marginBottom: 6,
    },
    notifTime: {
        fontSize: 11,
        color: '#BDBDBD',
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
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
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
    },
});
