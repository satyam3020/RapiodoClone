import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch,
  Modal,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.55;

const SAFETY_FEATURES = [
  {
    id: "1",
    title: "Proactive safety checks",
    subtitle: "24x7 monitoring of all rides",
    icon: "shield-checkmark",
    iconColor: "#FFF",
    bgColor: "#1A237E",
    description:
      "Our system continuously monitors all ongoing rides for unusual route deviations, unexpected stops, or prolonged idle time. Any anomaly triggers an automatic check-in with both the rider and captain.",
  },
  {
    id: "2",
    title: "Share live location",
    subtitle: "Let loved ones track your ride",
    icon: "location",
    iconColor: "#FFF",
    bgColor: "#00897B",
    description:
      "Share your real-time ride location with trusted contacts. They can track your entire journey on a map until you reach your destination safely.",
  },
  {
    id: "3",
    title: "SOS Emergency button",
    subtitle: "One-tap emergency alert",
    icon: "warning",
    iconColor: "#FFF",
    bgColor: "#C62828",
    description:
      "In case of an emergency, tap the SOS button during your ride. This will immediately alert our safety team and share your live location with your emergency contacts and local authorities.",
  },
  {
    id: "4",
    title: "Ride insurance",
    subtitle: "Coverage for every ride",
    icon: "heart-circle",
    iconColor: "#FFF",
    bgColor: "#6A1B9A",
    description:
      "Every VahaniQ ride comes with complimentary insurance coverage. This covers accidental injuries during the ride for both riders and captains, providing financial protection and peace of mind.",
  },
  {
    id: "5",
    title: "Verified captains",
    subtitle: "Background-checked drivers",
    icon: "person-circle",
    iconColor: "#FFF",
    bgColor: "#E65100",
    description:
      "All VahaniQ captains undergo thorough background verification including identity checks, driving license verification, criminal record checks, and vehicle inspection before they can start accepting rides.",
  },
];

const SAFETY_TIPS = [
  {
    id: "1",
    tip: "Always verify the vehicle number before boarding",
    icon: "car-outline",
  },
  {
    id: "2",
    tip: "Share your ride details with a trusted contact",
    icon: "share-social-outline",
  },
  { id: "3", tip: "Wear a helmet during bike rides", icon: "bicycle-outline" },
  {
    id: "4",
    tip: "Use the in-app SOS button for emergencies",
    icon: "alert-circle-outline",
  },
  { id: "5", tip: "Rate your captain after every ride", icon: "star-outline" },
];

export default function SafetyScreen({ navigation }) {
  const { t } = useContext(AppContext);
  const [shareLocation, setShareLocation] = useState(false);
  const [rideAlerts, setRideAlerts] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const trustedContacts = [
    { id: "1", name: "Mom", phone: "+91 98765 43210" },
    { id: "2", name: "Dad", phone: "+91 87654 32109" },
  ];

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
        <Text style={styles.headerTitle}>{t("safety.title")}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <View style={styles.introContainer}>
          <Text style={styles.introText}>{t("safety.intro")}</Text>
          <TouchableOpacity>
            <Text style={styles.knowMoreText}>{t("safety.knowMore")}</Text>
          </TouchableOpacity>
        </View>

        {/* Safety Features Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
        >
          {SAFETY_FEATURES.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[styles.featureCard, { backgroundColor: feature.bgColor }]}
              onPress={() => setSelectedFeature(feature)}
              activeOpacity={0.85}
            >
              <View style={styles.featureIconWrap}>
                <Ionicons
                  name={feature.icon}
                  size={36}
                  color={feature.iconColor}
                />
              </View>
              <Text style={styles.featureTitle}>{t(`safety.feature${feature.id}Title`)}</Text>
              <Text style={styles.featureSubtitle}>{t(`safety.feature${feature.id}Sub`)}</Text>
              <View style={styles.featureArrow}>
                <Ionicons
                  name="arrow-forward-circle"
                  size={28}
                  color="rgba(255,255,255,0.5)"
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Scroll Indicator */}
        <View style={styles.scrollIndicator}>
          <View style={styles.scrollIndicatorActive} />
          <View style={styles.scrollIndicatorInactive} />
          <View style={styles.scrollIndicatorInactive} />
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>{t("safety.settings")}</Text>

        {/* Trusted Contacts */}
        <TouchableOpacity
          style={styles.settingsCard}
          onPress={() => setShowContactModal(true)}
        >
          <View style={styles.settingsCardContent}>
            <Text style={styles.settingsCardTitle}>{t("safety.newTrusted")}</Text>
            <Text style={styles.settingsCardSubtitle}>
              {t("safety.shareRide")}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#1E2B4D" />
        </TouchableOpacity>

        {/* Toggle Settings */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Ionicons name="location-outline" size={22} color="#1E2B4D" />
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>{t("safety.autoShare")}</Text>
                <Text style={styles.toggleSubtitle}>
                  {t("safety.autoShareSub")}
                </Text>
              </View>
            </View>
            <Switch
              value={shareLocation}
              onValueChange={setShareLocation}
              trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
              thumbColor={shareLocation ? "#FFF" : "#FFF"}
            />
          </View>

          <View style={styles.toggleDivider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#1E2B4D"
              />
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>{t("safety.rideAlerts")}</Text>
                <Text style={styles.toggleSubtitle}>
                  {t("safety.rideAlertsSub")}
                </Text>
              </View>
            </View>
            <Switch
              value={rideAlerts}
              onValueChange={setRideAlerts}
              trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
              thumbColor={rideAlerts ? "#FFF" : "#FFF"}
            />
          </View>
        </View>

        {/* Safety Tips */}
        <Text style={styles.sectionTitle}>{t("safety.safetyTips")}</Text>
        <View style={styles.tipsContainer}>
          {SAFETY_TIPS.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.tipRow,
                index !== SAFETY_TIPS.length - 1 && styles.tipBorder,
              ]}
            >
              <View style={styles.tipIconContainer}>
                <Ionicons name={item.icon} size={20} color="#1E2B4D" />
              </View>
              <Text style={styles.tipText}>{t(`safety.tip${item.id}`)}</Text>
            </View>
          ))}
        </View>

        {/* Emergency Section */}
        <View style={styles.emergencyContainer}>
          <MaterialCommunityIcons
            name="phone-alert"
            size={30}
            color="#C62828"
          />
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>{t("safety.emergencyTitle")}</Text>
            <Text style={styles.emergencySubtitle}>
              {t("safety.emergencySub")}
            </Text>
          </View>
          <TouchableOpacity style={styles.emergencyButton}>
            <Ionicons name="call" size={18} color="#FFF" />
            <Text style={styles.emergencyButtonText}>112</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Feature Detail Modal */}
      <Modal
        visible={selectedFeature !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedFeature(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View
                style={[
                  styles.modalIconContainer,
                  { backgroundColor: selectedFeature?.bgColor || "#1E2B4D" },
                ]}
              >
                <Ionicons
                  name={selectedFeature?.icon || "shield"}
                  size={28}
                  color="#FFF"
                />
              </View>
              <TouchableOpacity onPress={() => setSelectedFeature(null)}>
                <Ionicons name="close" size={24} color="#1E2B4D" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>{selectedFeature ? t(`safety.feature${selectedFeature.id}Title`) : ""}</Text>
            <Text style={styles.modalSubtitle}>
              {selectedFeature ? t(`safety.feature${selectedFeature.id}Sub`) : ""}
            </Text>
            <View style={styles.modalDivider} />
            <Text style={styles.modalDescription}>
              {selectedFeature?.description}
            </Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: selectedFeature?.bgColor || "#1E2B4D" },
              ]}
              onPress={() => setSelectedFeature(null)}
            >
              <Text style={styles.modalButtonText}>{t("safety.gotIt")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Trusted Contacts Modal */}
      <Modal
        visible={showContactModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.contactModalTitle}>{t("safety.trustedModalTitle")}</Text>
              <TouchableOpacity onPress={() => setShowContactModal(false)}>
                <Ionicons name="close" size={24} color="#1E2B4D" />
              </TouchableOpacity>
            </View>

            {trustedContacts.map((contact) => (
              <View key={contact.id} style={styles.contactRow}>
                <View style={styles.contactAvatar}>
                  <Ionicons name="person" size={20} color="#667085" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addContactButton}>
              <Ionicons name="add-circle-outline" size={22} color="#1A73E8" />
              <Text style={styles.addContactText}>{t("safety.addContact")}</Text>
            </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 20,
  },
  introContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  introText: {
    fontSize: 15,
    color: "#424242",
    lineHeight: 22,
    marginBottom: 6,
  },
  knowMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A73E8",
  },
  carouselContainer: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  featureCard: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 18,
    padding: 20,
    marginRight: 16,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  featureIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 12,
  },
  featureSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
  },
  featureArrow: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  scrollIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 8,
    gap: 4,
  },
  scrollIndicatorActive: {
    width: 20,
    height: 4,
    backgroundColor: "#424242",
    borderRadius: 2,
  },
  scrollIndicatorInactive: {
    width: 20,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E2B4D",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  settingsCardContent: {
    flex: 1,
  },
  settingsCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E2B4D",
    marginBottom: 4,
  },
  settingsCardSubtitle: {
    fontSize: 13,
    color: "#757575",
    lineHeight: 18,
  },
  toggleSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    overflow: "hidden",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  toggleInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  toggleTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E2B4D",
  },
  toggleSubtitle: {
    fontSize: 12,
    color: "#9E9E9E",
    marginTop: 2,
  },
  toggleDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
  },
  tipsContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    overflow: "hidden",
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  tipBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  tipIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#424242",
    fontWeight: "500",
  },
  emergencyContainer: {
    backgroundColor: "#FFF5F5",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  emergencyContent: {
    flex: 1,
    marginLeft: 14,
  },
  emergencyTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#C62828",
  },
  emergencySubtitle: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C62828",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  emergencyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "65%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1E2B4D",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 15,
    color: "#424242",
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButton: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 25,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactModalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1E2B4D",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E2B4D",
  },
  contactPhone: {
    fontSize: 13,
    color: "#9E9E9E",
    marginTop: 2,
  },
  addContactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
    marginTop: 8,
  },
  addContactText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A73E8",
  },
});
