import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function DriverEarningsScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('wallet'); // 'all' or 'wallet'

    const renderWalletTab = () => (
        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            {/* Balance Card */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>आपका वॉलेट बैलेंस</Text>
                <Text style={styles.balanceAmount}>₹39.18</Text>
                <TouchableOpacity style={styles.transferButton}>
                    <MaterialCommunityIcons name="bank" size={20} color="black" style={{ marginRight: 8 }} />
                    <Text style={styles.transferButtonText}>मनी ट्रांसफर</Text>
                </TouchableOpacity>
                <Text style={styles.transferLimitText}>आपके पास 7 ट्रांसफर बाकी हैं</Text>
                <Text style={styles.renewalText}>
                    मनी ट्रांसफर हर सोमवार को रिन्यू होता है! <Text style={styles.linkText}>और जानो</Text>
                </Text>
            </View>

            {/* Refer Banner */}
            <View style={styles.referBanner}>
                <View style={styles.referTextCol}>
                    <Text style={styles.referTitle}>रेफर करें और कमाएँ</Text>
                    <Text style={styles.referAmount}>₹6500 तक</Text>
                </View>
                <View style={styles.referImagePlaceholder}>
                    {/* Simulating the money stack image */}
                    <Ionicons name="cash-outline" size={60} color="#9C27B0" />
                </View>
            </View>

            {/* Pagination dots simulation */}
            <View style={styles.pagination}>
                <View style={styles.pageDotActive}><Text style={styles.pageDotText}>1/2</Text></View>
                <View style={styles.pageDotInactive} />
            </View>

            {/* Transactions Section */}
            <View style={styles.transactionsHeader}>
                <Text style={styles.transactionsTitle}>पिछले ट्रांजेक्शन</Text>
                <TouchableOpacity><Text style={styles.filterText}>फ़िल्टर</Text></TouchableOpacity>
            </View>

            <View style={styles.transactionTabs}>
                <TouchableOpacity style={styles.txTabActive}>
                    <Text style={styles.txTabActiveText}>सभी ट्रांजेक्शन</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.txTabInactive}>
                    <Text style={styles.txTabInactiveText}>विचाराधीन</Text>
                </TouchableOpacity>
            </View>

            {/* Transaction List */}
            <Text style={styles.dateHeader}>03 मार्च 2026</Text>
            <View style={styles.transactionCard}>
                <View style={styles.txIconBox}>
                    <Text style={styles.rupeeSymbol}>₹</Text>
                </View>
                <View style={styles.txDetails}>
                    <Text style={styles.txName}>Access Fee</Text>
                    <Text style={styles.txTime}>10:22 am</Text>
                </View>
                <Text style={styles.txAmount}>- ₹19</Text>
            </View>

            <Text style={styles.dateHeader}>02 मार्च 2026</Text>
            <View style={styles.transactionCard}>
                <View style={styles.txIconBox}>
                    <Text style={styles.rupeeSymbol}>₹</Text>
                </View>
                <View style={styles.txDetails}>
                    <Text style={styles.txName}>Ride Earning</Text>
                    <Text style={styles.txTime}>04:15 pm</Text>
                </View>
                <Text style={[styles.txAmount, { color: '#4CAF50' }]}>+ ₹150</Text>
            </View>

        </ScrollView>
    );

    const renderAllEarningsTab = () => (
        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            {/* Today's Earning Box */}
            <View style={styles.allEarningsCard}>
                <Text style={styles.allEarningsLabel}>आज की कमाई</Text>
                <Text style={styles.allEarningsAmount}>₹0</Text>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItemRow}>
                    <View style={styles.menuIconBox}><Ionicons name="receipt-outline" size={20} color="#1A73E8" /></View>
                    <View style={styles.menuItemTextCol}>
                        <Text style={styles.menuItemTitle}>सभी ऑर्डर</Text>
                        <Text style={styles.menuItemSub}>पुराने ऑर्डर और ऑर्डर अर्निंग</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItemRow}>
                    <View style={styles.menuIconBox}><Ionicons name="time-outline" size={20} color="#1A73E8" /></View>
                    <View style={styles.menuItemTextCol}>
                        <Text style={styles.menuItemTitle}>पिछले ऑर्डर की कमाई</Text>
                        <Text style={styles.menuItemSub}><Text style={{ color: '#4CAF50' }}>₹232</Text>  •  Auto  •  05:36 PM</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItemRow}>
                    <View style={styles.menuIconBox}><Ionicons name="card-outline" size={20} color="#1A73E8" /></View>
                    <View style={styles.menuItemTextCol}>
                        <Text style={styles.menuItemTitle}>रेट कार्ड देखें</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
                </TouchableOpacity>
            </View>

            {/* YouTube Banner */}
            <View style={styles.ytBanner}>
                <Text style={styles.ytBannerText}>अपनी कमाई के बारे में सब जानें</Text>
                <View style={styles.ytRightCol}>
                    <Ionicons name="logo-youtube" size={32} color="#D32F2F" />
                </View>
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>कमाई</Text>
                <TouchableOpacity style={styles.helpButton}>
                    <Ionicons name="headset" size={16} color="black" />
                    <Text style={styles.helpText}>हेल्प</Text>
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'all' && styles.activeTab]}
                    onPress={() => setActiveTab('all')}
                >
                    <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>सारी कमाई</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'wallet' && styles.activeTab]}
                    onPress={() => setActiveTab('wallet')}
                >
                    <Text style={[styles.tabText, activeTab === 'wallet' && styles.activeTabText]}>वॉलैट</Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View style={styles.contentBackground}>
                {activeTab === 'wallet' ? renderWalletTab() : renderAllEarningsTab()}
            </View>
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
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        flex: 1,
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    helpText: {
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 16,
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#1A437E', // Darker blue
    },
    tabText: {
        fontSize: 16,
        color: '#757575',
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#1A437E',
    },
    contentBackground: {
        flex: 1,
        backgroundColor: '#F5F6F8', // Light greyish blue background from screens
    },
    tabContent: {
        flex: 1,
        padding: 16,
    },
    // Wallet Styles
    balanceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
    },
    balanceLabel: {
        fontSize: 16,
        color: '#424242',
        marginBottom: 10,
    },
    balanceAmount: {
        fontSize: 48,
        fontWeight: '900',
        color: '#1B5E20', // Dark green
        marginBottom: 20,
    },
    transferButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
        marginBottom: 15,
    },
    transferButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transferLimitText: {
        color: '#757575',
        fontSize: 14,
        marginBottom: 20,
    },
    renewalText: {
        fontSize: 12,
        color: '#757575',
        textAlign: 'center',
    },
    linkText: {
        color: '#1A73E8',
        textDecorationLine: 'underline',
    },
    referBanner: {
        backgroundColor: '#F3E5F5', // Light purple
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    referTitle: {
        fontSize: 16,
        color: '#424242',
        marginBottom: 5,
    },
    referAmount: {
        fontSize: 24,
        fontWeight: '900',
        color: '#4A148C',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    pageDotActive: {
        backgroundColor: '#455A64', // Dark grey
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    pageDotText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    pageDotInactive: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#90A4AE',
    },
    transactionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    transactionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    filterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A73E8',
    },
    transactionTabs: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    txTabActive: {
        backgroundColor: '#455A64', // Dark blue-grey
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
    },
    txTabActiveText: {
        color: 'white',
        fontWeight: 'bold',
    },
    txTabInactive: {
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    txTabInactiveText: {
        color: '#757575',
        fontWeight: 'bold',
    },
    dateHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        marginTop: 10,
    },
    transactionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    txIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    rupeeSymbol: {
        fontSize: 16,
        color: '#424242',
    },
    txDetails: {
        flex: 1,
    },
    txName: {
        fontSize: 16,
        color: '#424242',
        marginBottom: 4,
    },
    txTime: {
        fontSize: 12,
        color: '#9E9E9E',
    },
    txAmount: {
        fontSize: 16,
        color: '#757575',
    },

    // All Earnings Styles
    allEarningsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 15,
        padding: 5,
    },
    allEarningsLabel: {
        fontSize: 16,
        color: '#424242',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
    allEarningsAmount: {
        fontSize: 48,
        fontWeight: '900',
        color: '#212121',
        textAlign: 'center',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        width: '100%',
    },
    menuItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    menuIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F0FE', // Light blue background for icon
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuItemTextCol: {
        flex: 1,
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    menuItemSub: {
        fontSize: 14,
        color: '#757575',
    },
    ytBanner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F3E5F5', // Light purple gradient feel
        borderRadius: 12,
        padding: 20,
        marginTop: 10,
    },
    ytBannerText: {
        fontSize: 14,
        color: '#424242',
        flex: 1,
    },
    ytRightCol: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
