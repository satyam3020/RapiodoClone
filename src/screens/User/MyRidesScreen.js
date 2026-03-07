import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";

const MOCK_RIDES = [
  {
    id: "1",
    type: "Bike",
    icon: "motorbike",
    from: "Andheri Station",
    to: "Bandra Kurla Complex",
    date: "05 Mar 2026, 09:30 AM",
    fare: "₹85",
    status: "Completed",
    distance: "6.2 km",
    duration: "22 min",
  },
  {
    id: "2",
    type: "Auto",
    icon: "rickshaw",
    from: "Dahisar East",
    to: "Borivali Station",
    date: "04 Mar 2026, 06:15 PM",
    fare: "₹45",
    status: "Completed",
    distance: "3.1 km",
    duration: "15 min",
  },
  {
    id: "3",
    type: "Cab",
    icon: "car",
    from: "Mumbai Central",
    to: "Chhatrapati Shivaji Airport T2",
    date: "02 Mar 2026, 04:00 AM",
    fare: "₹320",
    status: "Completed",
    distance: "18.5 km",
    duration: "35 min",
  },
  {
    id: "4",
    type: "Bike",
    icon: "motorbike",
    from: "Kandarpada",
    to: "Dahisar Check Naka",
    date: "28 Feb 2026, 08:45 AM",
    fare: "₹35",
    status: "Cancelled",
    distance: "2.0 km",
    duration: "-",
  },
  {
    id: "5",
    type: "Auto",
    icon: "rickshaw",
    from: "Mira Road Station",
    to: "Kashimira Junction",
    date: "25 Feb 2026, 11:00 AM",
    fare: "₹60",
    status: "Completed",
    distance: "4.5 km",
    duration: "18 min",
  },
];

export default function MyRidesScreen({ navigation }) {
  const { t } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("all");

  const filteredRides =
    activeTab === "all"
      ? MOCK_RIDES
      : MOCK_RIDES.filter((r) => r.status.toLowerCase() === activeTab);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("myRides.title")}</Text>
        <Text style={styles.headerSubtitle}>{t("myRides.subtitle")}</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {["all", "completed", "cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.filterTab,
              activeTab === tab && styles.filterTabActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.filterTabText,
                activeTab === tab && styles.filterTabTextActive,
              ]}
            >
              {t(`myRides.${tab}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredRides.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="car-off" size={60} color="#E0E0E0" />
            <Text style={styles.emptyText}>{t("myRides.noRides")}</Text>
          </View>
        ) : (
          filteredRides.map((ride) => (
            <View key={ride.id} style={styles.rideCard}>
              {/* Ride Header */}
              <View style={styles.rideHeader}>
                <View style={styles.rideTypeRow}>
                  <View style={styles.rideIconContainer}>
                    <MaterialCommunityIcons
                      name={ride.icon}
                      size={22}
                      color="#FFF"
                    />
                  </View>
                  <Text style={styles.rideType}>{ride.type}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    ride.status === "Cancelled" && styles.statusBadgeCancelled,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      ride.status === "Cancelled" && styles.statusTextCancelled,
                    ]}
                  >
                    {ride.status}
                  </Text>
                </View>
              </View>

              {/* Route */}
              <View style={styles.routeContainer}>
                <View style={styles.routeDots}>
                  <View style={styles.greenDot} />
                  <View style={styles.routeLine} />
                  <View style={styles.redDot} />
                </View>
                <View style={styles.routeDetails}>
                  <Text style={styles.routeText} numberOfLines={1}>
                    {ride.from}
                  </Text>
                  <Text style={styles.routeText} numberOfLines={1}>
                    {ride.to}
                  </Text>
                </View>
              </View>

              {/* Ride Info Footer */}
              <View style={styles.rideFooter}>
                <View style={styles.rideInfoItem}>
                  <Ionicons name="calendar-outline" size={14} color="#757575" />
                  <Text style={styles.rideInfoText}>{ride.date}</Text>
                </View>
                <View style={styles.rideFooterRight}>
                  <View style={styles.rideInfoItem}>
                    <Ionicons
                      name="speedometer-outline"
                      size={14}
                      color="#757575"
                    />
                    <Text style={styles.rideInfoText}>{ride.distance}</Text>
                  </View>
                  <Text style={styles.rideFare}>{ride.fare}</Text>
                </View>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("UserHome")}
        >
          <Ionicons name="navigate-outline" size={24} color="#757575" />
          <Text style={styles.navText}>{t("userHome.navRide")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="car-outline" size={24} color="#000" />
          <Text style={[styles.navText, { color: "#000", fontWeight: "bold" }]}>
            {t("profile.myRides")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Notification")}
        >
          <Ionicons name="notifications-outline" size={24} color="#757575" />
          <Text style={styles.navText}>{t("profile.notifications")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color="#757575" />
          <Text style={styles.navText}>{t("profile.title")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingBottom: 5,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  filterTabActive: {
    backgroundColor: "#000",
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#757575",
  },
  filterTabTextActive: {
    color: "#FFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 15,
  },
  rideCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  rideTypeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rideIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rideType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
  },
  statusBadgeCancelled: {
    backgroundColor: "#FFEBEE",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E7D32",
  },
  statusTextCancelled: {
    color: "#C62828",
  },
  routeContainer: {
    flexDirection: "row",
    marginBottom: 14,
  },
  routeDots: {
    alignItems: "center",
    marginRight: 12,
    paddingTop: 4,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: "#E0E0E0",
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F44336",
  },
  routeDetails: {
    flex: 1,
    justifyContent: "space-between",
    height: 46,
  },
  routeText: {
    fontSize: 14,
    color: "#424242",
    fontWeight: "500",
  },
  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 12,
  },
  rideFooterRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  rideInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rideInfoText: {
    fontSize: 12,
    color: "#757575",
  },
  rideFare: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  navText: {
    fontSize: 10,
    color: "#757575",
    marginTop: 4,
  },
});
