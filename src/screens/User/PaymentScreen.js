import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { RapidoButton } from "../../components/RapidoButton";

export default function PaymentScreen({ navigation }) {
  const handleSuccess = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "UserHome" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={100} color={Colors.success} />
        </View>
        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.amount}>₹51.00</Text>

        <View style={styles.receiptBox}>
          <View style={styles.row}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>Vikram Singh (Captain)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>
              Today,{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Method</Text>
            <Text style={styles.value}>Cash</Text>
          </View>
        </View>

        <RapidoButton
          title="Back to Home"
          onPress={handleSuccess}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 10,
  },
  amount: {
    fontSize: 48,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 40,
  },
  receiptBox: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#F2F4F7",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    color: "#667085",
    fontSize: 16,
  },
  value: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.secondary,
  },
  button: {
    backgroundColor: Colors.primary,
  },
});
