import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { RapidoButton } from "../../components/RapidoButton";

export default function DriverLoginScreen({ navigation }) {
  const { t } = useContext(AppContext);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.content}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpButton}>
              <Ionicons name="headset" size={16} color="black" />
              <Text style={styles.helpText}>{t("language.help")}</Text>
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarRings}>
              <View style={styles.avatarInner}>
                {/* Placeholder for hand/phone icon */}
                <Ionicons
                  name="phone-portrait"
                  size={30}
                  color={Colors.secondary}
                />
              </View>
            </View>
          </View>

          {/* Text & Input */}
          <Text style={styles.title}>{t("driverAuth.title")}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.prefixText}>+91</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              autoFocus
            />
          </View>

          {/* Footer - Spacer */}
          <View style={{ flex: 1 }} />

          <View style={styles.footer}>
            <Text style={styles.terms}>
              {t("userAuth.terms")}{" "}
              <Text style={styles.termsLink}>{t("userAuth.termsLink")}</Text>
            </Text>

            <TouchableOpacity style={styles.changeNumberButton}>
              <Text style={styles.changeNumberText}>
                {t("driverAuth.changeNumber")}
              </Text>
            </TouchableOpacity>

            <RapidoButton
              title={t("generic.next")}
              onPress={() => navigation.navigate("DriverOTP")}
              style={[
                styles.continueButton,
                phoneNumber.length >= 10
                  ? { backgroundColor: Colors.primary }
                  : { backgroundColor: "#E0E0E0" },
              ]}
              textStyle={styles.continueButtonText}
              disabled={phoneNumber.length < 10}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
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
  avatarContainer: {
    marginBottom: 30,
  },
  avatarRings: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF8E1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFECB3",
  },
  avatarInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFCC80",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    marginBottom: 24,
    lineHeight: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
  },
  prefixText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: "#000",
    fontWeight: "500",
    padding: 0,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  terms: {
    textAlign: "center",
    color: "#424242",
    fontSize: 14,
    marginBottom: 24,
  },
  termsLink: {
    color: "#1A237E", // Dark blue text for link
  },
  changeNumberButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  changeNumberText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  continueButton: {
    borderRadius: 30,
  },
  continueButtonText: {
    color: "#000",
  },
});
