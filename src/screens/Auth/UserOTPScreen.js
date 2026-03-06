import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const { width, height } = Dimensions.get("window");

export default function UserOTPScreen({ navigation, route }) {
  const { t } = useContext(AppContext);
  const { phone } = route.params || { phone: "0000000000" };
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(20);
  const inputs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleNext = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 6) {
      // Navigate to Registration details
      navigation.navigate("Register", { phone });
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

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
          <Text style={styles.headerTitle}>{t("userOtp.title")}</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={18} color="black" />
            <Text style={styles.helpText}>{t("userAuth.help")}</Text>
          </TouchableOpacity>
        </View>

        {/* Info Text */}
        <View style={styles.infoSection}>
          <Text style={styles.subTitle}>{t("userOtp.subtitle")}</Text>
          <Text style={styles.sentToText}>
            {t("userOtp.sentTo")}
            {phone}
          </Text>
        </View>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : styles.otpBoxEmpty,
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(el) => (inputs.current[index] = el)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Resend Options */}
        <View style={styles.resendSection}>
          <TouchableOpacity style={styles.resendButton} disabled={timer > 0}>
            <Ionicons
              name="chatbubble-outline"
              size={16}
              color={timer > 0 ? "#757575" : "black"}
            />
            <Text
              style={[
                styles.resendText,
                { color: timer > 0 ? "#757575" : "black" },
              ]}
            >
              {timer > 0
                ? t("userOtp.resendTimer").replace("{time}", timer)
                : t("userOtp.resendBtn")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappButton}>
            <FontAwesome name="whatsapp" size={18} color="#25D366" />
            <Text style={styles.whatsappText}>{t("userOtp.whatsappBtn")}</Text>
          </TouchableOpacity>
        </View>

        {/* Footer and Next Button */}
        <View style={styles.footer}>
          <Text style={styles.footerNotice}>{t("userOtp.whatsappTerms")}</Text>

          <TouchableOpacity
            style={[
              styles.nextButton,
              isOtpComplete
                ? styles.nextButtonActive
                : styles.nextButtonInactive,
            ]}
            disabled={!isOtpComplete}
            onPress={handleNext}
          >
            <Text
              style={[
                styles.nextButtonText,
                isOtpComplete
                  ? styles.nextButtonTextActive
                  : styles.nextButtonTextInactive,
              ]}
            >
              {t("userOtp.next")}
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
    backgroundColor: "#F5F7FA", // Matches the light greyish tint in the mockup
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
  infoSection: {
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  sentToText: {
    fontSize: 16,
    color: "#616161",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpBox: {
    width: width / 8,
    height: width / 8,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  otpBoxEmpty: {
    borderColor: "#9E9E9E",
  },
  otpBoxFilled: {
    borderColor: "#000000",
  },
  resendSection: {
    alignItems: "flex-start",
    marginBottom: 30,
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  resendText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  whatsappText: {
    marginLeft: 8,
    color: "#000",
    fontWeight: "500",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  footerNotice: {
    textAlign: "center",
    fontSize: 12,
    color: "#757575",
    marginBottom: 20,
    lineHeight: 18,
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
