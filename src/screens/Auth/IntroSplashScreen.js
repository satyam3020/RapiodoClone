import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function IntroSplashScreen({ navigation }) {
  const { t } = useContext(AppContext);
  useEffect(() => {
    // Simulate location fetching delay
    const timer = setTimeout(() => {
      navigation.replace("LanguageSelection");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#E0E0E0" style={styles.loader} />
        <Text style={styles.text}>
          {t("generic.loading") || "Please Wait, getting your location"}
        </Text>
      </View>

      <View style={styles.logoContainer}>
        {/* VahaniQ-Partner Text Logo as fallback if image isn't loaded */}
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>VahaniQ</Text>
        </View>
        <Text style={styles.partnerText}>Partner</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    transform: [{ scale: 1.5 }],
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#424242",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80, // Space from bottom
  },
  logoBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  logoBadgeText: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.secondary,
  },
  partnerText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: -1,
  },
});
