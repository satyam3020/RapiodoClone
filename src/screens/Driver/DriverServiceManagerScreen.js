import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function DriverServiceManagerScreen({ navigation }) {
  const { t } = useContext(AppContext);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("driverServiceManager.title")}</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="headset" size={16} color="black" />
          <Text style={styles.helpText}>{t("driverServiceManager.help")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Auto Active Service */}
        <View style={styles.serviceBox}>
          <View style={styles.avatarCircle}>
            {/* Placeholder for small avatar image */}
            <MaterialIcons name="local-taxi" size={30} color="#1A73E8" />
          </View>
          <Text style={styles.serviceName}>{t("driverServiceManager.auto")}</Text>
          <View style={styles.activeTag}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.activeTagText}>{t("driverServiceManager.active")}</Text>
          </View>
        </View>

        {/* Auto Parcel Active Service */}
        <View style={styles.serviceBox}>
          <View style={[styles.avatarCircle, { backgroundColor: "#FFECB3" }]}>
            <Ionicons name="cube-outline" size={30} color="#FF8F00" />
          </View>
          <Text style={styles.serviceName}>{t("driverServiceManager.autoParcel")}</Text>
          <View style={styles.activeTag}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.activeTagText}>{t("driverServiceManager.active")}</Text>
          </View>
        </View>

        {/* Auto Boost Start Service */}
        <View
          style={[
            styles.serviceBox,
            {
              backgroundColor: "#FFFFFF",
              borderColor: "#E0E0E0",
              borderWidth: 1,
            },
          ]}
        >
          <View style={styles.avatarCircle}>
            <MaterialIcons name="local-taxi" size={30} color="#1A73E8" />
          </View>
          <Text style={styles.serviceName}>{t("driverServiceManager.autoBoost")}</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>{t("driverServiceManager.start")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8", // Light greyish background
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
  content: {
    flex: 1,
  },
  serviceBox: {
    backgroundColor: "#FFF8E1", // Pale yellow for active services
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F0FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  serviceName: {
    flex: 1,
    fontSize: 18,
    color: "#212121",
    fontWeight: "500",
  },
  activeTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Green
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTagText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  startButton: {
    borderWidth: 1,
    borderColor: "#388E3C", // Green border
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: "#388E3C",
    fontWeight: "bold",
    fontSize: 14,
  },
});
