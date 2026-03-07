import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { AppContext } from "../../context/AppContext";

export default function IntroSplashScreen({ navigation }) {
  const { t } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("LanguageSelection");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* VahaniQ-Partner Logo */}
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSection}>
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        <Text style={styles.text}>
          {t("generic.loading") || "Please Wait, getting your location"}
        </Text>
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
  logo: {
    width: 250,
    height: 250,
  },
  bottomSection: {
    alignItems: "center",
    marginBottom: 60,
  },
  loader: {
    transform: [{ scale: 1.2 }],
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#424242",
  },
});
