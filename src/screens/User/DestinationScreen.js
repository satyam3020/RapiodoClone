import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const PREVIOUS_LOCATIONS = [
  {
    id: "1",
    name: "ISKCON Mandir Sri Sri Radhagiri...",
    address: "Siddhi Vinayak Nagar, Mahajan Wadi, Mira R...",
    icon: "history",
  },
  {
    id: "2",
    name: "College",
    address: "Shree L R Tiwari College of Engineering, Ka...",
    icon: "school",
    special: true,
  },
  {
    id: "3",
    name: "Geetanjali Railway Colony",
    address: "Laxmi Nagar, Jogeshwari East, Mumbai, Ma...",
    icon: "history",
  },
  {
    id: "4",
    name: "HDFC Bank",
    address: "Poonam Sagar Road, Shanti Park, Mira Road ...",
    icon: "history",
  },
  {
    id: "5",
    name: "IIT Bombay",
    address: "Main Gate Road, IIT Area, Powai, Mumbai, M...",
    icon: "history",
  },
];

export default function DestinationScreen({ navigation }) {
  const [dropLocation, setDropLocation] = useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => navigation.navigate("RideSelection")}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={item.icon === "school" ? "school" : "time-outline"}
          size={22}
          color={Colors.textLight}
        />
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.locationAddress} numberOfLines={1}>
          {item.address}
        </Text>
      </View>
      <Ionicons
        name={item.special ? "heart" : "heart-outline"}
        size={20}
        color={item.special ? "#FF5722" : Colors.border}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Search Fields */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Drop</Text>
          <View style={styles.forMeBadge}>
            <Text style={styles.forMeText}>For me</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.secondary} />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.dotColumn}>
              <View style={[styles.dot, { backgroundColor: "#4CAF50" }]} />
              <View style={styles.dotLine} />
              <View style={[styles.dot, { backgroundColor: "#FF5722" }]} />
            </View>
            <View style={styles.fields}>
              <View style={styles.fieldItem}>
                <Text style={styles.currentLocationText}>
                  Your Current Location
                </Text>
              </View>
              <View style={styles.divider} />
              <TextInput
                style={styles.textInput}
                placeholder="Drop location"
                value={dropLocation}
                onChangeText={setDropLocation}
                autoFocus
              />
            </View>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionItem}>
              <Ionicons name="location" size={16} color={Colors.secondary} />
              <Text style={styles.actionText}>Select on map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Ionicons name="add" size={20} color={Colors.secondary} />
              <Text style={styles.actionText}>Add stops</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* History List */}
        <FlatList
          data={PREVIOUS_LOCATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.secondary,
    flex: 1,
  },
  forMeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  forMeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.secondary,
    marginRight: 4,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  inputWrapper: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EAECF0",
  },
  dotColumn: {
    alignItems: "center",
    width: 20,
    justifyContent: "center",
    marginRight: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#D0D5DD",
    marginVertical: 4,
  },
  fields: {
    flex: 1,
  },
  fieldItem: {
    height: 40,
    justifyContent: "center",
  },
  currentLocationText: {
    fontSize: 16,
    color: "#475467",
  },
  divider: {
    height: 1,
    backgroundColor: "#EAECF0",
  },
  textInput: {
    height: 40,
    fontSize: 16,
    color: Colors.secondary,
  },
  quickActions: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flex: 0.48,
    justifyContent: "center",
  },
  actionText: {
    marginLeft: 6,
    fontWeight: "bold",
    color: Colors.secondary,
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
    marginLeft: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.secondary,
  },
  locationAddress: {
    fontSize: 13,
    color: "#667085",
    marginTop: 2,
  },
});
