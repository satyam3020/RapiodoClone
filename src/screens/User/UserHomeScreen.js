import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const { width } = Dimensions.get("window");

export default function UserHomeScreen({ navigation }) {
  const { t } = useContext(AppContext);
  // Mock data for places
  const goPlaces = [
    {
      id: "1",
      name: "Chhatrapati Shivaji Maharaj Internatio...",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=300&h=200",
    },
    {
      id: "2",
      name: "Chhatrapati Shivaji Maharaj Terminus",
      image:
        "https://images.unsplash.com/photo-1549487950-7117215c2ec5?auto=format&fit=crop&q=80&w=300&h=200",
    },
    {
      id: "3",
      name: "Mumbai Central",
      image:
        "https://images.unsplash.com/photo-1582510003544-4b00cf3e8e19?auto=format&fit=crop&q=80&w=300&h=200",
    },
  ];

  // Mock data for recent locations
  const recentLocations = [
    {
      id: "1",
      title: "Mini Nagar",
      subtitle: "SN Dube Road, Ambica Society, Rawalpada, ...",
    },
    {
      id: "2",
      title: "NAND DHAM CO-OPERATIVE HOUSI...",
      subtitle: "Bhausaheb Parab Road, Kandarpada, Dahisa...",
    },
    {
      id: "3",
      title: "Mini Nagar",
      subtitle: "Rawalpada, Dahisar East, Mumbai, Maharash...",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Search Bar */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Destination")}
        >
          <Ionicons
            name="search"
            size={20}
            color="#000"
            style={styles.searchIcon}
          />
          <Text style={styles.searchText}>
            {t("userHome.searchPlaceholder")}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Auto Promo Banner */}
        <View
          style={[
            styles.bannerCard,
            { backgroundColor: "#F8F9FA", borderColor: "#E0E0E0" },
          ]}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitleDark}>{t("userHome.hurry")}</Text>
            <Text style={styles.bannerSubtitleDark}>
              {t("userHome.hurrySubtitle")}
            </Text>
            <Text style={styles.bannerLinkText}>{t("generic.bookNow")}</Text>
          </View>
          <View style={styles.bannerRightAuto}>
            <Text style={styles.autoTag}>5 MIN{"\n"}AUTO</Text>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&q=80&w=200",
              }}
              style={styles.autoImage}
            />
          </View>
        </View>

        {/* Go Places Section */}
        <Text style={styles.sectionTitle}>{t("userHome.goPlaces")}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.placesScroll}
          contentContainerStyle={styles.placesContainer}
        >
          {goPlaces.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeCard}>
              <Image source={{ uri: place.image }} style={styles.placeImage} />
              <Text style={styles.placeText} numberOfLines={2}>
                {place.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.scrollIndicator}>
          <View style={styles.scrollIndicatorActive} />
          <View style={styles.scrollIndicatorInactive} />
        </View>

        {/* Cab Promo Banner */}
        <View
          style={[
            styles.bannerCard,
            { backgroundColor: "#1A1A1A", height: 180, overflow: "hidden" },
          ]}
        >
          <View
            style={[styles.bannerLeft, { zIndex: 2, justifyContent: "center" }]}
          >
            <Text style={styles.bannerTitleWhite}>
              Four wheels.{"\n"}Easy Rides.
            </Text>
            <Text style={styles.bannerSubtitleWhite}>
              Use code <Text style={styles.dottedCode}>GOFREE</Text>
              {"\n"}on 1st Cab ride.
            </Text>
            <TouchableOpacity style={styles.tryCabButton}>
              <Text style={styles.tryCabText}>Try our Cab</Text>
            </TouchableOpacity>
            <Text style={styles.tncText}>*T&C Apply</Text>
          </View>
          <View style={styles.cabImageContainer}>
            {/* Glow effect simulated with background color behind image */}
            <View style={styles.cabGlow} />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=300",
              }}
              style={styles.cabImage}
            />
          </View>
        </View>

        {/* Recent Locations */}
        <View style={styles.recentLocationsContainer}>
          {recentLocations.map((loc, index) => (
            <View
              key={loc.id}
              style={[
                styles.recentItem,
                index !== recentLocations.length - 1 && styles.borderBottom,
              ]}
            >
              <MaterialCommunityIcons
                name="history"
                size={24}
                color="#757575"
                style={styles.historyIcon}
              />
              <View style={styles.recentTextContainer}>
                <Text style={styles.recentTitle}>{loc.title}</Text>
                <Text style={styles.recentSubtitle} numberOfLines={1}>
                  {loc.subtitle}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Everything in minutes Section */}
        <Text style={styles.sectionTitle}>Everything in minutes</Text>
        <View style={styles.gridContainer}>
          {/* Cricket Banner (Large Left) */}
          <TouchableOpacity
            style={[styles.gridItemLarge, { backgroundColor: "#E3F2FD" }]}
          >
            <Text style={styles.gridTitle}>Match dekh{"\n"}bina mach-mach</Text>
            <Text style={styles.gridLink}>See More</Text>
            {/* Simulated Cricket illustration */}
            <MaterialCommunityIcons
              name="cricket"
              size={100}
              color="#1E88E5"
              style={styles.gridIconLarge}
            />
          </TouchableOpacity>

          <View style={styles.gridRightColumn}>
            {/* Metro Banner (Top Right) */}
            <TouchableOpacity
              style={[
                styles.gridItemSmall,
                { backgroundColor: "#E0F7FA", marginBottom: 12 },
              ]}
            >
              <Text style={styles.gridSubtitleSmall}>
                Bhidu, skip the bheed
              </Text>
              <Text style={styles.gridTitleSmall}>Ride Metro</Text>
              <MaterialCommunityIcons
                name="train"
                size={60}
                color="#00838F"
                style={styles.gridIconSmallTR}
              />
            </TouchableOpacity>

            <View style={styles.gridBottomRow}>
              {/* Parcel Banner */}
              <TouchableOpacity
                style={[
                  styles.gridItemTiny,
                  { backgroundColor: "#FFF3E0", marginRight: 6 },
                ]}
              >
                <Text style={styles.gridTitleTiny}>Parcel</Text>
                <FontAwesome5
                  name="box-open"
                  size={40}
                  color="#E65100"
                  style={styles.gridIconTiny}
                />
              </TouchableOpacity>

              {/* More Banner */}
              <TouchableOpacity
                style={[
                  styles.gridItemTiny,
                  { backgroundColor: "#F5F5F5", marginLeft: 6 },
                ]}
              >
                <Text style={styles.gridTitleTiny}>More</Text>
                <Ionicons
                  name="apps"
                  size={40}
                  color="#9E9E9E"
                  style={styles.gridIconTiny}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer Illustration */}
        <View style={styles.footerIllustration}>
          <Text style={styles.hashtagText}>#goRapido</Text>
          <View style={styles.madeInRow}>
            <Text style={styles.madeInText}>🇮🇳 Made for India</Text>
          </View>
          <View style={styles.madeInRow}>
            <Text style={styles.madeInText}>❤️ Crafted in Bengaluru</Text>
          </View>
          {/* Decorative faded background icons */}
          <MaterialCommunityIcons
            name="rickshaw"
            size={120}
            color="#EEEEEE"
            style={styles.bgIcon1}
          />
          <Ionicons
            name="car-sport"
            size={100}
            color="#EEEEEE"
            style={styles.bgIcon2}
          />
        </View>

        {/* Extra padding to ensure scroll content clears bottom nav */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("UserHome")}
        >
          <Ionicons
            name="navigate-outline"
            size={24}
            color="#000"
            style={styles.activeIconFilter}
          />
          <Text style={[styles.navText, { color: "#000", fontWeight: "bold" }]}>
            {t("userHome.navRide")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("MyRides")}
        >
          <Ionicons name="car-outline" size={24} color="#757575" />
          <Text style={styles.navText}>My Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Notification")}
        >
          <Ionicons name="notifications-outline" size={24} color="#757575" />
          <Text style={styles.navText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color="#757575" />
          <Text style={styles.navText}>{t("userHome.navProfile")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContent: {
    paddingBottom: 90, // Space for bottom nav
  },
  bannerCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 25,
  },
  bannerLeft: {
    flex: 1,
    justifyContent: "center",
  },
  bannerTitleDark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  bannerSubtitleDark: {
    fontSize: 14,
    color: "#424242",
    marginTop: 4,
    marginBottom: 10,
  },
  bannerLinkText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#424242",
  },
  bannerRightAuto: {
    width: 120,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "relative",
  },
  autoTag: {
    position: "absolute",
    top: -5,
    right: 0,
    backgroundColor: "#FFC107",
    color: "#000",
    fontWeight: "bold",
    fontSize: 10,
    padding: 4,
    textAlign: "center",
    borderRadius: 4,
    zIndex: 2,
  },
  autoImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#424242",
    marginLeft: 20,
    marginBottom: 15,
  },
  placesScroll: {
    paddingLeft: 20,
  },
  placesContainer: {
    paddingRight: 40,
  },
  placeCard: {
    width: 140,
    marginRight: 15,
  },
  placeImage: {
    width: 140,
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  placeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  scrollIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 25,
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
    marginLeft: 4,
  },
  bannerTitleWhite: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  bannerSubtitleWhite: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 8,
    lineHeight: 20,
  },
  dottedCode: {
    fontWeight: "bold",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#FFF",
    paddingHorizontal: 4,
  },
  tryCabButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFC107",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  tryCabText: {
    color: "#FFC107",
    fontWeight: "bold",
    fontSize: 12,
  },
  tncText: {
    color: "#9E9E9E",
    fontSize: 10,
  },
  cabImageContainer: {
    position: "absolute",
    right: -30,
    bottom: 10,
    width: 200,
    height: 120,
  },
  cabGlow: {
    position: "absolute",
    bottom: 0,
    left: 20,
    width: 150,
    height: 50,
    backgroundColor: "#FF9800",
    opacity: 0.5,
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
  },
  cabImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    zIndex: 1,
  },
  recentLocationsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  historyIcon: {
    marginRight: 15,
  },
  recentTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  recentSubtitle: {
    fontSize: 12,
    color: "#757575",
  },
  gridContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  gridItemLarge: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    marginRight: 12,
    overflow: "hidden",
  },
  gridTitle: {
    fontSize: 16,
    color: "#424242",
    marginBottom: 10,
  },
  gridLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  gridIconLarge: {
    position: "absolute",
    bottom: -10,
    right: -10,
    opacity: 0.8,
  },
  gridRightColumn: {
    flex: 1,
  },
  gridItemSmall: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    overflow: "hidden",
  },
  gridSubtitleSmall: {
    fontSize: 12,
    color: "#424242",
  },
  gridTitleSmall: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  gridIconSmallTR: {
    position: "absolute",
    bottom: -5,
    right: -5,
    opacity: 0.8,
  },
  gridBottomRow: {
    flexDirection: "row",
    flex: 1,
  },
  gridItemTiny: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  gridTitleTiny: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  gridIconTiny: {
    position: "absolute",
    bottom: -5,
    right: -5,
    opacity: 0.7,
  },
  footerIllustration: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: "relative",
    overflow: "hidden",
    minHeight: 200,
  },
  hashtagText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#E0E0E0",
    fontStyle: "italic",
    marginBottom: 15,
  },
  madeInRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  madeInText: {
    color: "#757575",
    fontSize: 14,
  },
  bgIcon1: {
    position: "absolute",
    right: -20,
    top: 20,
  },
  bgIcon2: {
    position: "absolute",
    right: 80,
    bottom: 10,
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
  activeIconFilter: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
