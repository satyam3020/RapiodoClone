import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FreeMap from "../../components/FreeMap";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function RideTrackingScreen({ navigation }) {
  const [step, setStep] = useState(1); // 1 = Choose Pickup, 2 = Looking for Captain
  const [selectedPickup, setSelectedPickup] = useState("current"); // 'nearby' or 'current'

  useEffect(() => {
    // If we reach step 2, we simulate waiting.
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3); // Transition to driver accepted state
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {/* Back button overlay */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Top Notification (Only in Step 2 & 3) */}
        {(step === 2 || step === 3) && (
          <View style={styles.topNotification}>
            <View style={styles.topNotifHeader}>
              <Text style={styles.appNameNotif}>VahaniQ • now</Text>
              <Ionicons name="notifications" size={16} color="#424242" />
            </View>
            <Text style={styles.topNotifTitle}>
              {step === 2
                ? "Waiting for Captain to accept"
                : "Captain is arriving in 5 mins"}
            </Text>
            {/* Simulated Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: step === 3 ? "100%" : "60%" },
                ]}
              />
            </View>
          </View>
        )}

        <FreeMap
          style={styles.map}
          initialRegion={{ latitude: 19.25, longitude: 72.86 }}
          markers={[
            { latitude: 19.26, longitude: 72.865 },
            { latitude: 19.24, longitude: 72.855 }
          ]}
          polyline={[
            { latitude: 19.24, longitude: 72.855 },
            { latitude: 19.25, longitude: 72.86 },
            { latitude: 19.26, longitude: 72.865 },
          ]}
        />
      </View>

      {/* Bottom Sheet UI */}
      <View style={styles.bottomSheet}>
        {/* Drag Handle */}
        <View style={styles.dragHandle} />

        {step === 1 ? (
          // STEP 1: Choose Pickup
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <MaterialCommunityIcons
                name="map-marker-percent"
                size={28}
                color="#2E7D32"
                style={styles.headerIcon}
              />
              <Text style={styles.sheetTitle}>Choose your pickup</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.pickupOption,
                selectedPickup === "nearby"
                  ? styles.pickupOptionActive
                  : styles.pickupOptionInactive,
              ]}
              onPress={() => setSelectedPickup("nearby")}
            >
              <View style={styles.pickupOptionText}>
                <Text style={styles.pickupOptionTitle}>Nearby Pickup</Text>
                <Text style={styles.pickupOptionSub}>85 meters away</Text>
              </View>
              <View style={styles.priceTagLight}>
                <Text style={styles.priceTagText}>₹50</Text>
              </View>
              {/* Walk & Save Badge */}
              <View style={styles.walkSaveBadge}>
                <Text style={styles.walkSaveText}>Walk & Save</Text>
                <MaterialCommunityIcons
                  name="percent-outline"
                  size={14}
                  color="white"
                  style={{ marginLeft: 4 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pickupOption,
                selectedPickup === "current"
                  ? styles.pickupOptionActive
                  : styles.pickupOptionInactive,
              ]}
              onPress={() => setSelectedPickup("current")}
            >
              <View style={styles.pickupOptionText}>
                <Text style={styles.pickupOptionTitle}>Current Location</Text>
              </View>
              <View style={styles.priceTagLight}>
                <Text style={styles.priceTagText}>₹71</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setStep(2)}
            >
              <Text style={styles.primaryBtnText}>
                Continue from{" "}
                {selectedPickup === "current" ? "Current" : "Nearby"} pickup
              </Text>
            </TouchableOpacity>
          </View>
        ) : step === 2 ? (
          // STEP 2: Looking for Captain
          <View style={styles.sheetContent}>
            <View style={styles.lookingHeader}>
              <View>
                <Text style={styles.lookingSub}>Looking for your</Text>
                <Text style={styles.lookingTitle}>Rickshaw ride</Text>
              </View>
              {/* Simulated Rickshaw Graphic */}
              <MaterialCommunityIcons
                name="rickshaw"
                size={40}
                color="#FFC107"
              />
            </View>

            {/* Progress Segments */}
            <View style={styles.progressSegments}>
              <View style={[styles.segment, styles.segmentActive]} />
              <View style={[styles.segment, styles.segmentActive]} />
              <View style={styles.segment} />
              <View style={styles.segment} />
            </View>

            {/* Ride Details Box */}
            <View style={styles.rideBox}>
              <View>
                <Text style={styles.rideBoxTitle}>Rickshaw</Text>
                <Text style={styles.rideBoxPrice}>₹ 71.0</Text>
              </View>
              <TouchableOpacity style={styles.tripDetailsBtn}>
                <Text style={styles.tripDetailsText}>Trip Details</Text>
              </TouchableOpacity>
            </View>

            {/* Dashed Divider */}
            <View style={styles.dashedDivider} />

            {/* Payment Method */}
            <View style={styles.paymentRow}>
              <MaterialCommunityIcons name="cash" size={24} color="#616161" />
              <Text style={styles.paymentText}>Paying via cash</Text>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.primaryBtnFlat}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.primaryBtnText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => setStep(1)}
              >
                <Text style={styles.secondaryBtnText}>Cancel Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // STEP 3: Captain Accepted
          <View style={styles.sheetContent}>
            <View style={styles.lookingHeader}>
              <View>
                <Text style={styles.lookingSub}>Captain assigned</Text>
                <Text style={styles.lookingTitle}>Arriving in 5 mins</Text>
              </View>
            </View>

            <View style={styles.driverCard}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={30} color="#667085" />
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>Vikram Singh</Text>
                <Text style={styles.vehicleInfo}>
                  Yellow Auto • MH 04 AB 1234
                </Text>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={14} color="#FFC107" />
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
              </View>
              <View style={styles.otpBox}>
                <Text style={styles.otpLabel}>OTP</Text>
                <Text style={styles.otpValue}>4521</Text>
              </View>
            </View>

            {/* Call / Message actions */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.primaryBtnFlat,
                  { flex: 1, marginRight: 10, marginBottom: 0 },
                ]}
              >
                <Text style={styles.primaryBtnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.secondaryBtn, { flex: 1, paddingVertical: 14 }]}
              >
                <Text style={styles.secondaryBtnText}>Message</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => navigation.navigate("Payment")}
              >
                <Text style={styles.secondaryBtnText}>
                  Complete Ride (Demo)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  topNotification: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  topNotifHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  appNameNotif: {
    fontSize: 12,
    color: "#757575",
    flex: 1,
  },
  topNotifTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#EEEEEE",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#757575",
  },
  pickupMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetContent: {
    width: "100%",
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  pickupOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    position: "relative",
  },
  pickupOptionActive: {
    borderColor: "#2E7D32",
    backgroundColor: "#FAFAFA",
  },
  pickupOptionInactive: {
    borderColor: "#E0E0E0",
    backgroundColor: "white",
  },
  pickupOptionText: {
    flex: 1,
  },
  pickupOptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  pickupOptionSub: {
    fontSize: 12,
    color: "#424242",
    marginTop: 4,
  },
  priceTagLight: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceTagText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  walkSaveBadge: {
    position: "absolute",
    top: -12,
    right: 16,
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderBottomRightRadius: 0,
  },
  walkSaveText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  primaryBtn: {
    backgroundColor: "#FFC107",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  primaryBtnFlat: {
    backgroundColor: "#FFC107",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6D4C41", // Brown border
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6D4C41", // Brown text
  },
  lookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  lookingSub: {
    fontSize: 14,
    color: "#616161",
  },
  lookingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  progressSegments: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  segment: {
    flex: 1,
    height: 4,
    backgroundColor: "#EEEEEE",
    borderRadius: 2,
    marginHorizontal: 2,
  },
  segmentActive: {
    backgroundColor: "#1E88E5",
  },
  rideBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  rideBoxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  rideBoxPrice: {
    fontSize: 16,
    color: "#424242",
  },
  tripDetailsBtn: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tripDetailsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  dashedDivider: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    marginBottom: 20,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 16,
    color: "#424242",
    marginLeft: 10,
  },
  actionButtons: {
    marginTop: 10,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFCFD",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E4E7EC",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EAECF0",
    alignItems: "center",
    justifyContent: "center",
  },
  driverInfo: {
    flex: 1,
    marginLeft: 15,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  vehicleInfo: {
    fontSize: 12,
    color: "#667085",
    marginTop: 4,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  otpBox: {
    alignItems: "center",
    backgroundColor: "#FFC107",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  otpLabel: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
  otpValue: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});
