import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DriverMilesBonusScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("daily");

  const renderDays = () => {
    const days = [
      { date: "3", label: "मार्च" },
      { date: "4", label: "मार्च" },
      { date: "5", label: "मार्च" },
      { date: "6", label: "आज", active: true },
      { date: "7", label: "मार्च" },
    ];

    return (
      <View style={styles.daysScroll}>
        {days.map((day, idx) => (
          <View
            key={idx}
            style={[styles.dayItem, day.active && styles.activeDayItem]}
          >
            <Text style={[styles.dayLabel, day.active && styles.activeDayText]}>
              {day.label}
            </Text>
            <Text style={[styles.dayDate, day.active && styles.activeDayText]}>
              {day.date}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>माइल्स बोनस</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="headset" size={16} color="black" />
          <Text style={styles.helpText}>हेल्प</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs & Days Section */}
      <View style={styles.topSection}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "daily" && styles.activeTab]}
            onPress={() => setActiveTab("daily")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "daily" && styles.activeTabText,
              ]}
            >
              रोज़
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "weekly" && styles.activeTab]}
            onPress={() => setActiveTab("weekly")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "weekly" && styles.activeTabText,
              ]}
            >
              साप्ताहिक
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "bonus" && styles.activeTab]}
            onPress={() => setActiveTab("bonus")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "bonus" && styles.activeTabText,
              ]}
            >
              बोनस
            </Text>
          </TouchableOpacity>
        </View>

        {renderDays()}
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            {/* Simulated Magnifying Glass Document Icon */}
            <View style={styles.docBg}>
              <Ionicons
                name="search"
                size={40}
                color="#1A437E"
                style={styles.searchIcon}
              />
            </View>
          </View>
          <Text style={styles.emptyText}>
            माइल्स बोनस अभी तक नहीं बनाया गया है। बाद में आइए
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    flex: 1,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  helpText: {
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 14,
  },
  topSection: {
    backgroundColor: "#4E4E4E", // Dark grey background for tabs
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#616161",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FFD501", // VahaniQ Yellow
  },
  tabText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    opacity: 0.7,
  },
  activeTabText: {
    opacity: 1,
    color: "#FFD501",
  },
  daysScroll: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    alignItems: "center",
  },
  dayItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  activeDayItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#FFD501",
  },
  dayLabel: {
    fontSize: 12,
    color: "#BDBDBD",
    marginBottom: 2,
  },
  dayDate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  activeDayText: {
    color: "#000000",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#F5F5F5",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  docBg: {
    width: 60,
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#424242",
    textAlign: "center",
    lineHeight: 24,
  },
});
