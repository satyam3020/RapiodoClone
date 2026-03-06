import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Ionicons } from "@expo/vector-icons";

export default function DriverOTPScreen({ navigation }) {
  const { t } = useContext(AppContext);
  const [timer, setTimer] = useState(26);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const simulateVerify = () => {
    navigation.navigate("DriverCitySelection");
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    } else if (index === 5 && value) {
      simulateVerify();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
              <Ionicons
                name="chatbubble-ellipses"
                size={24}
                color={Colors.secondary}
              />
            </View>
          </View>
        </View>

        {/* Title & Timer */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{t("userOtp.title")}</Text>
          <Text style={styles.timer}>
            00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        </View>

        {/* OTP Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : styles.otpBoxEmpty,
              ]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(el) => (inputs.current[index] = el)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Auto redirect button for demo purposes */}
        <TouchableOpacity onPress={simulateVerify} style={styles.demoButton}>
          <Text style={styles.demoText}>Skip to City (Demo)</Text>
        </TouchableOpacity>
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#757575",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderRadius: 4,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  otpBoxEmpty: {
    borderColor: "#BDBDBD",
  },
  otpBoxFilled: {
    borderColor: "#000000",
  },
  demoButton: {
    marginTop: 50,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  demoText: {
    color: "#999",
  },
});
