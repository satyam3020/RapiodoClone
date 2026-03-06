import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";
import { Colors } from "../../constants/Colors";

export default function RegisterScreen({ navigation, route }) {
  const { phone } = route.params || { phone: "0000000000" };
  const { setUser, setRole } = useContext(AppContext);

  const [name, setName] = useState("");
  const [gender, setGender] = useState(null); // 'Male', 'Female', 'Other'
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [hasReferral, setHasReferral] = useState(false);

  const handleNext = () => {
    if (name.trim().length > 1) {
      // Mock finalizing registration and logging in as user
      setUser({
        id: "passenger_" + Math.random().toString(36).substr(2, 9),
        name: name,
        phone: phone,
        gender: gender,
        isVerified: true,
      });
      setRole("user");
    }
  };

  const isComplete = name.trim().length > 1;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>One last step</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={18} color="black" />
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* Name Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Your name</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color="#616161"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Type your name"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>
        </View>

        {/* Gender Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            {["Male", "Female", "Other"].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderPill,
                  gender === g
                    ? styles.genderPillActive
                    : styles.genderPillInactive,
                ]}
                onPress={() => setGender(g)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === g
                      ? styles.genderTextActive
                      : styles.genderTextInactive,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Checkboxes */}
        <View style={styles.checkboxesSection}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setWhatsappUpdates(!whatsappUpdates)}
          >
            <FontAwesome
              name="whatsapp"
              size={20}
              color="#25D366"
              style={styles.checkboxIconList}
            />
            <Text style={styles.checkboxText}>Receive updates on Whatsapp</Text>
            <MaterialCommunityIcons
              name={
                whatsappUpdates ? "checkbox-marked" : "checkbox-blank-outline"
              }
              size={24}
              color={whatsappUpdates ? "#1A73E8" : "#9E9E9E"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setHasReferral(!hasReferral)}
          >
            <Ionicons
              name="gift"
              size={20}
              color="#E91E63"
              style={styles.checkboxIconList}
            />
            <Text style={styles.checkboxText}>Have a referral code?</Text>
            <MaterialCommunityIcons
              name={hasReferral ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color={hasReferral ? "#1A73E8" : "#9E9E9E"}
            />
          </TouchableOpacity>
        </View>

        {/* Footer Next Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              isComplete ? styles.nextButtonActive : styles.nextButtonInactive,
            ]}
            disabled={!isComplete}
            onPress={handleNext}
          >
            <Text
              style={[
                styles.nextButtonText,
                isComplete
                  ? styles.nextButtonTextActive
                  : styles.nextButtonTextInactive,
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    marginLeft: 15,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  helpText: {
    fontWeight: "bold",
    marginLeft: 4,
    color: "#000",
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#B0BEC5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  genderContainer: {
    flexDirection: "row",
    gap: 10,
  },
  genderPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  genderPillInactive: {
    backgroundColor: "transparent",
    borderColor: "#B0BEC5",
  },
  genderPillActive: {
    backgroundColor: "#1E2B4D",
    borderColor: "#1E2B4D",
  },
  genderText: {
    fontWeight: "bold",
  },
  genderTextInactive: {
    color: "#000",
  },
  genderTextActive: {
    color: "white",
  },
  checkboxesSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxIconList: {
    marginRight: 15,
    width: 20,
    textAlign: "center",
  },
  checkboxText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonActive: {
    backgroundColor: "#FFD501",
  },
  nextButtonInactive: {
    backgroundColor: "#E0E0E0",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButtonTextActive: {
    color: "#000000",
  },
  nextButtonTextInactive: {
    color: "#9E9E9E",
  },
});
