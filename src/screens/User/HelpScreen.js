import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Animated,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

// Help topic categories with sub-topics
const HELP_TOPICS = [
  {
    id: "1",
    title: "Ride fare related Issues",
    icon: "cash-outline",
    iconBg: "#FFF8E1",
    iconColor: "#FF8F00",
    subTopics: [
      {
        id: "1a",
        title: "I was overcharged for my ride",
        answer:
          "If you believe you were overcharged, please check the fare breakdown in your ride details. The fare is calculated based on distance, time, surge pricing (if applicable), and any tolls. If you still find a discrepancy, you can raise a dispute and our team will review it within 24-48 hours.",
      },
      {
        id: "1b",
        title: "Fare is different from estimate",
        answer:
          "The estimated fare is calculated before the ride starts based on the expected route. The actual fare may differ due to route changes, traffic conditions, waiting time, or toll charges. If the difference is significant, please raise a complaint.",
      },
      {
        id: "1c",
        title: "I was charged a cancellation fee",
        answer:
          "A cancellation fee is charged when a ride is cancelled after the captain has been assigned and has started moving towards your pickup location. This compensates the captain for their time and fuel. The fee varies based on the vehicle type.",
      },
      {
        id: "1d",
        title: "Coupon/offer not applied",
        answer:
          "Please ensure the coupon code is valid and has not expired. Check the terms and conditions of the offer, including minimum ride value, applicable vehicle types, and usage limits. If the coupon should have been applied, contact support with the ride details.",
      },
      {
        id: "1e",
        title: "Refund not received",
        answer:
          "Refunds typically take 5-7 business days to reflect in your account. If it has been longer, please check with your bank. For wallet refunds, the amount is credited instantly. Contact support if the refund is still pending.",
      },
    ],
  },
  {
    id: "2",
    title: "Captain and Vehicle related issues",
    icon: "person-outline",
    iconBg: "#FFF3E0",
    iconColor: "#E65100",
    subTopics: [
      {
        id: "2a",
        title: "Captain was rude or unprofessional",
        answer:
          "We are sorry to hear this. VahaniQ takes the behavior of captains very seriously. Please report the incident with details and we will take strict action. The captain may be warned, suspended, or permanently blocked based on severity.",
      },
      {
        id: "2b",
        title: "Captain took a longer route",
        answer:
          "If the captain deviated from the optimal route without a valid reason (like road closure or heavy traffic), you may be eligible for a fare adjustment. Please report this with your ride ID and we will review the route taken.",
      },
      {
        id: "2c",
        title: "Vehicle condition was poor",
        answer:
          "We require all captains to maintain their vehicles in good condition. If you experienced issues like a dirty vehicle, broken mirrors, or safety concerns, please report it. We will inspect the vehicle and take necessary action.",
      },
      {
        id: "2d",
        title: "Captain asked for extra money",
        answer:
          "Captains are not allowed to ask for any money beyond the fare shown in the app. If a captain demands extra payment, please do not pay and report the incident immediately. We will take strict action against such behavior.",
      },
      {
        id: "2e",
        title: "Safety concern during ride",
        answer:
          "Your safety is our top priority. If you felt unsafe during a ride due to rash driving, phone usage while driving, or any other reason, please report it immediately. For emergencies, use the SOS button in the app.",
      },
    ],
  },
  {
    id: "3",
    title: "Other Topics",
    icon: "help-circle-outline",
    iconBg: "#E8EAF6",
    iconColor: "#3F51B5",
    subTopics: [
      {
        id: "3a",
        title: "How to update my profile",
        answer:
          "Go to Profile > tap on your name and phone number section > You can update your name, email, and profile photo. Phone number changes require OTP verification for security purposes.",
      },
      {
        id: "3b",
        title: "How to add/change payment method",
        answer:
          "Go to the Payment section in your profile. You can add UPI, debit/credit cards, or use VahaniQ wallet. To change the default payment method, tap on the preferred option and set it as default.",
      },
      {
        id: "3c",
        title: "I left an item in the vehicle",
        answer:
          'If you left an item in the vehicle, go to your ride history, select the ride, and tap "Lost Item". We will connect you with the captain. Please report within 24 hours of the ride for the best chance of recovery.',
      },
      {
        id: "3d",
        title: "How to schedule a ride",
        answer:
          'On the home screen, enter your destination and tap "Schedule for later". Select your preferred date and time. You will receive a notification 30 minutes before the scheduled time. Cancellation is free up to 5 minutes before the scheduled time.',
      },
      {
        id: "3e",
        title: "Account or login issues",
        answer:
          "If you are facing login issues, try the following: 1) Ensure you are using the correct phone number. 2) Check your internet connection. 3) Clear the app cache. 4) Reinstall the app. If the problem persists, contact support.",
      },
    ],
  },
];

// Mock support tickets
const MOCK_TICKETS = [
  {
    id: "T001",
    subject: "Overcharged for ride on 02 Mar",
    status: "In Progress",
    date: "02 Mar 2026",
    rideId: "R-20260302-001",
  },
  {
    id: "T002",
    subject: "Refund not received",
    status: "Resolved",
    date: "25 Feb 2026",
    rideId: "R-20260225-003",
  },
];

export default function HelpScreen({ navigation }) {
  const { t } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [expandedSubTopic, setExpandedSubTopic] = useState(null);
  const [showTickets, setShowTickets] = useState(false);

  const TRANSLATED_HELP_TOPICS = HELP_TOPICS.map(topic => ({
    ...topic,
    title: topic.id === "1" ? t("userHelp.topic_fare") : topic.id === "2" ? t("userHelp.topic_captain") : t("userHelp.topic_other")
  }));

  // Filter help topics based on search
  const filteredTopics = searchQuery.trim()
    ? TRANSLATED_HELP_TOPICS.map((topic) => ({
      ...topic,
      subTopics: topic.subTopics.filter((sub) =>
        sub.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    })).filter((topic) => topic.subTopics.length > 0)
    : TRANSLATED_HELP_TOPICS;

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
    setExpandedSubTopic(null);
  };

  const toggleSubTopic = (subTopicId) => {
    setExpandedSubTopic(expandedSubTopic === subTopicId ? null : subTopicId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1E2B4D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("userHelp.title")}</Text>
        <TouchableOpacity
          style={styles.ticketsButton}
          onPress={() => setShowTickets(true)}
        >
          <Ionicons name="receipt-outline" size={18} color="#1E2B4D" />
          <Text style={styles.ticketsButtonText}>{t("userHelp.tickets")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Your Last Ride */}
        <Text style={styles.sectionLabel}>{t("userHelp.yourLastRide")}</Text>
        <View style={styles.lastRideCard}>
          <TouchableOpacity style={styles.lastRideRow}>
            <MaterialCommunityIcons
              name="motorbike"
              size={28}
              color="#1E2B4D"
              style={styles.rideIcon}
            />
            <View style={styles.lastRideInfo}>
              <Text style={styles.lastRideTitle} numberOfLines={1}>
                8V2G+9G4, Kanakia Park
              </Text>
              <Text style={styles.lastRideSubtitle}>
                05 Mar 2026 • 08:56 AM
              </Text>
              <Text style={styles.lastRideFare}>Rs.41 • {t("userHelp.completed")}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.rideHistoryDivider} />

          <TouchableOpacity
            style={styles.rideHistoryRow}
            onPress={() => navigation.navigate("MyRides")}
          >
            <Ionicons name="time-outline" size={20} color="#1E2B4D" />
            <Text style={styles.rideHistoryText}>{t("userHelp.fullRideHistory")}</Text>
            <Ionicons name="chevron-forward" size={18} color="#1E2B4D" />
          </TouchableOpacity>
        </View>

        {/* Help Topics */}
        <Text style={styles.sectionLabel}>{t("userHelp.helpTopics")}</Text>
        <View style={styles.helpTopicsContainer}>
          {/* Search Box */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9E9E9E" />
            <TextInput
              style={styles.searchInput}
              placeholder={t("userHelp.searchPlaceholder")}
              placeholderTextColor="#9E9E9E"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </View>

          {/* Topics List */}
          {filteredTopics.length === 0 ? (
            <View style={styles.noResults}>
              <Ionicons name="search-outline" size={40} color="#E0E0E0" />
              <Text style={styles.noResultsText}>{t("userHelp.noResults")}</Text>
            </View>
          ) : (
            filteredTopics.map((topic) => (
              <View key={topic.id}>
                <TouchableOpacity
                  style={styles.topicItem}
                  onPress={() => toggleTopic(topic.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.topicIconContainer,
                      { backgroundColor: topic.iconBg },
                    ]}
                  >
                    <Ionicons
                      name={topic.icon}
                      size={22}
                      color={topic.iconColor}
                    />
                  </View>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Ionicons
                    name={
                      expandedTopic === topic.id
                        ? "chevron-down"
                        : "chevron-forward"
                    }
                    size={18}
                    color="#1E2B4D"
                  />
                </TouchableOpacity>

                {/* Sub-topics (expanded) */}
                {expandedTopic === topic.id && (
                  <View style={styles.subTopicsContainer}>
                    {topic.subTopics.map((sub) => (
                      <View key={sub.id}>
                        <TouchableOpacity
                          style={styles.subTopicItem}
                          onPress={() => toggleSubTopic(sub.id)}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.subTopicTitle}>{sub.title}</Text>
                          <Ionicons
                            name={
                              expandedSubTopic === sub.id
                                ? "chevron-up"
                                : "chevron-down"
                            }
                            size={16}
                            color="#757575"
                          />
                        </TouchableOpacity>

                        {/* Answer (expanded) */}
                        {expandedSubTopic === sub.id && (
                          <View style={styles.answerContainer}>
                            <Text style={styles.answerText}>{sub.answer}</Text>
                            <View style={styles.answerActions}>
                              <Text style={styles.helpfulText}>
                                {t("userHelp.wasHelpful")}
                              </Text>
                              <View style={styles.helpfulButtons}>
                                <TouchableOpacity style={styles.helpfulBtn}>
                                  <Ionicons
                                    name="thumbs-up-outline"
                                    size={18}
                                    color="#4CAF50"
                                  />
                                  <Text
                                    style={[
                                      styles.helpfulBtnText,
                                      { color: "#4CAF50" },
                                    ]}
                                  >
                                    {t("userHelp.yes")}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.helpfulBtn}>
                                  <Ionicons
                                    name="thumbs-down-outline"
                                    size={18}
                                    color="#F44336"
                                  />
                                  <Text
                                    style={[
                                      styles.helpfulBtnText,
                                      { color: "#F44336" },
                                    ]}
                                  >
                                    {t("userHelp.no")}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Contact Support */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>{t("userHelp.stillNeedHelp")}</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="chatbubbles-outline" size={20} color="#FFF" />
            <Text style={styles.contactButtonText}>{t("userHelp.chatWithSupport")}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Tickets Modal */}
      <Modal
        visible={showTickets}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTickets(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t("userHelp.myTickets")}</Text>
              <TouchableOpacity onPress={() => setShowTickets(false)}>
                <Ionicons name="close" size={24} color="#1E2B4D" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {MOCK_TICKETS.length === 0 ? (
                <View style={styles.noTickets}>
                  <Ionicons name="receipt-outline" size={50} color="#E0E0E0" />
                  <Text style={styles.noTicketsText}>{t("userHelp.noTickets")}</Text>
                </View>
              ) : (
                MOCK_TICKETS.map((ticket) => (
                  <View key={ticket.id} style={styles.ticketCard}>
                    <View style={styles.ticketHeader}>
                      <Text style={styles.ticketId}>{ticket.id}</Text>
                      <View
                        style={[
                          styles.ticketStatus,
                          ticket.status === "Resolved"
                            ? styles.ticketResolved
                            : styles.ticketInProgress,
                        ]}
                      >
                        <Text
                          style={[
                            styles.ticketStatusText,
                            ticket.status === "Resolved"
                              ? styles.ticketResolvedText
                              : styles.ticketInProgressText,
                          ]}
                        >
                          {ticket.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.ticketSubject}>{ticket.subject}</Text>
                    <View style={styles.ticketFooter}>
                      <Text style={styles.ticketDate}>{ticket.date}</Text>
                      <Text style={styles.ticketRideId}>{ticket.rideId}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1E2B4D",
  },
  ticketsButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#1E2B4D",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  ticketsButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2B4D",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#424242",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  lastRideCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  lastRideRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  rideIcon: {
    marginRight: 14,
  },
  lastRideInfo: {
    flex: 1,
  },
  lastRideTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  lastRideSubtitle: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 2,
  },
  lastRideFare: {
    fontSize: 13,
    color: "#757575",
  },
  rideHistoryDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
  },
  rideHistoryRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 16,
  },
  rideHistoryText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1E2B4D",
    marginLeft: 10,
  },
  helpTopicsContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#000",
    marginLeft: 10,
    paddingVertical: 4,
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 14,
    color: "#BDBDBD",
    marginTop: 10,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  topicIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  topicTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1E2B4D",
  },
  subTopicsContainer: {
    backgroundColor: "#FAFAFA",
    paddingLeft: 56,
  },
  subTopicItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  subTopicTitle: {
    flex: 1,
    fontSize: 14,
    color: "#424242",
    fontWeight: "500",
  },
  answerContainer: {
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 4,
  },
  answerText: {
    fontSize: 13,
    color: "#616161",
    lineHeight: 20,
  },
  answerActions: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  helpfulText: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  helpfulButtons: {
    flexDirection: "row",
    gap: 12,
  },
  helpfulBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
  },
  helpfulBtnText: {
    fontSize: 12,
    fontWeight: "600",
  },
  contactContainer: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#424242",
    marginBottom: 15,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2B4D",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 25,
    gap: 10,
  },
  contactButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "70%",
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1E2B4D",
  },
  noTickets: {
    alignItems: "center",
    paddingVertical: 50,
  },
  noTicketsText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 12,
  },
  ticketCard: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#FAFAFA",
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#757575",
  },
  ticketStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ticketInProgress: {
    backgroundColor: "#FFF8E1",
  },
  ticketResolved: {
    backgroundColor: "#E8F5E9",
  },
  ticketStatusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  ticketInProgressText: {
    color: "#FF8F00",
  },
  ticketResolvedText: {
    color: "#2E7D32",
  },
  ticketSubject: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E2B4D",
    marginBottom: 10,
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ticketDate: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  ticketRideId: {
    fontSize: 12,
    color: "#9E9E9E",
  },
});
