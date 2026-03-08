import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function DriverAccessFeeScreen({ navigation }) {
  const { t } = useContext(AppContext);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("driverAccess.title")}</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="headset" size={16} color="black" />
          <Text style={styles.helpText}>{t("driverAccess.help")}</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        <View style={styles.blueBox}>
          <View style={styles.blueBoxTextCol}>
            <Text style={styles.blueBoxTitle}>
              {t("driverAccess.payOnlyWhen")}
            </Text>
          </View>
          <Ionicons
            name="car"
            size={60}
            color="#FFC107"
            style={{ alignSelf: "flex-end", marginTop: 10 }}
          />
        </View>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <Text style={styles.planHeader}>{t("driverAccess.planTitle")}</Text>
          <View style={styles.divider} />

          <View style={styles.planRow}>
            <Text style={styles.priceText}>
              <Text style={styles.priceBold}>₹19/-</Text> {t("driverAccess.perDay")}
            </Text>
            <Text style={styles.ridesText}>
              {t("driverAccess.rides_1_4")}
            </Text>
          </View>

          <View style={styles.planRow}>
            <Text style={styles.priceText}>
              <Text style={styles.priceBold}>₹0/-</Text> {t("driverAccess.perDay")}
            </Text>
            <Text style={styles.ridesText}>
              {t("driverAccess.rides_5_plus")}
            </Text>
          </View>
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
  content: {
    flex: 1,
    backgroundColor: "#1C60B4", // Blue background matching screenshot
  },
  blueBox: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  blueBoxTextCol: {
    flex: 1,
  },
  blueBoxTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 32,
  },
  autoImage: {
    width: 120,
    height: 100,
    resizeMode: "contain",
  },
  pricingCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 4,
    paddingBottom: 10,
  },
  planHeader: {
    padding: 16,
    fontSize: 14,
    color: "#424242",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  priceText: {
    fontSize: 16,
    color: "#424242",
  },
  priceBold: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  ridesText: {
    fontSize: 16,
    color: "#424242",
  },
  ridesBold: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
});
