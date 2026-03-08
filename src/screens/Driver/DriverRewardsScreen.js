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
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function DriverRewardsScreen({ navigation }) {
  const { t } = useContext(AppContext);
  const RewardCard = ({
    title,
    subtitle,
    bgTop,
    bgBottom,
    image,
    buttonText = "Know More",
  }) => (
    <View style={styles.cardContainer}>
      <View style={[styles.cardBg, { backgroundColor: bgBottom }]} />
      <View style={styles.cardContent}>
        <View style={styles.textStack}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
          <TouchableOpacity style={styles.knowMoreButton}>
            <Text style={styles.knowMoreText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageBox}>
          {/* Simulating images with icons/colors for now */}
          {image}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("driverRewards.title")}</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="headset" size={16} color="black" />
          <Text style={styles.helpText}>{t("driverRewards.help")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RewardCard
          title={t("driverRewards.healthInsurance")}
          subtitle={t("driverRewards.healthSub")}
          bgBottom="#E8F5E9" // Light Green
          image={<Ionicons name="medkit" size={80} color="#4CAF50" />}
          buttonText={t("driverRewards.knowMore")}
        />

        <RewardCard
          title={t("driverRewards.accidentalInsurance")}
          subtitle={t("driverRewards.accidentalSub")}
          bgBottom="#FFF8E1" // Light Yellow
          image={<Ionicons name="bicycle" size={80} color="#FFC107" />}
          buttonText={t("driverRewards.knowMore")}
        />

        <RewardCard
          title={t("driverRewards.medicineDiscount")}
          subtitle={t("driverRewards.medicineSub")}
          bgBottom="#F3E5F5" // Light Purple
          image={<Ionicons name="bandage" size={80} color="#9C27B0" />}
          buttonText={t("driverRewards.knowMore")}
        />
      </ScrollView>
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
    paddingBottom: 20,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  helpText: {
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
  cardContainer: {
    height: 160,
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    elevation: 2,
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  textStack: {
    flex: 0.65,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#424242",
    marginBottom: 16,
    lineHeight: 20,
  },
  knowMoreButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  knowMoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  imageBox: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
