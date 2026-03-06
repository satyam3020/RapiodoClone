import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";

const { width, height } = Dimensions.get("window");

const LANGUAGES = [
  { id: "1", label: "English", code: "en" },
  { id: "2", label: "हिन्दी", code: "hi" },
];

export default function LanguageScreen({ navigation }) {
  const { language, setLanguage, t } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Dark Blue Section */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="headset" size={16} color="white" />
          <Text style={styles.helpText}>{t("language.help")}</Text>
        </TouchableOpacity>

        {/* Illustration Simulation */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.bubble, styles.bubbleBg]}>
            <Text style={styles.bubbleText}>A</Text>
          </View>
          <View style={[styles.bubble, styles.bubbleFg]}>
            <Text style={styles.bubbleText}>आ</Text>
          </View>
        </View>
      </View>

      {/* Bottom Sheet Section */}
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>{t("language.title")}</Text>

        <ScrollView contentContainerStyle={styles.languageList}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={styles.languageItem}
              onPress={() => setLanguage(lang.code)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageText}>{lang.label}</Text>
                {/* Dotted line simulation */}
                <Text style={styles.dottedLine}>................</Text>
              </View>
              <View
                style={[
                  styles.radio,
                  language === lang.code && styles.radioSelected,
                ]}
              >
                {language === lang.code && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            language ? { backgroundColor: Colors.primary } : {},
          ]}
          onPress={() => navigation.replace("RoleSelection")}
          disabled={!language}
        >
          <Text style={styles.confirmText}>{t("language.confirm")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  topSection: {
    flex: 0.45,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    paddingTop: 20,
  },
  helpButton: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  helpText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
  },
  illustrationContainer: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 5, // speech bubble tail
  },
  bubbleBg: {
    backgroundColor: "rgba(255,255,255,0.2)",
    marginRight: -20,
    marginTop: -30,
  },
  bubbleFg: {
    backgroundColor: "rgba(255,255,255,0.4)",
    zIndex: 10,
  },
  bubbleText: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  bottomSheet: {
    flex: 0.55,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 20,
  },
  languageList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  languageItem: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  languageInfo: {
    flex: 1,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dottedLine: {
    color: "#999",
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9E9E9E",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#000000",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000000",
  },
  confirmButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  confirmText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
