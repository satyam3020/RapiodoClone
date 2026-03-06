import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { AppContext } from "../../context/AppContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { RapidoButton } from "../../components/RapidoButton";

const { width, height } = Dimensions.get("window");

export default function RideSelectionScreen({ navigation }) {
  const { location, setActiveRide } = useContext(AppContext);
  const [selectedService, setSelectedService] = useState("auto");

  // Mock route data
  const routeCoordinates = [
    location || { latitude: 19.2333, longitude: 72.8633 },
    { latitude: 19.245, longitude: 72.875 },
  ];

  const handleBookRide = () => {
    setActiveRide({
      id: "ride_123",
      service: "Auto",
      status: "searching",
      pickup: "Current Location",
      drop: "ISKCON Mandir",
      price: "₹51-₹75",
    });
    navigation.navigate("RideTracking");
  };

  return (
    <View style={styles.container}>
      {/* Navigation Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          ...routeCoordinates[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={routeCoordinates[0]} />
        <Marker coordinate={routeCoordinates[1]} />
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={4}
          strokeColor={Colors.mapLine}
        />
      </MapView>

      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        <Text style={styles.discountText}>
          Saving ₹12 with special discount
        </Text>

        <ScrollView contentContainerStyle={styles.serviceList}>
          {/* Only Rickshaw/Auto highlighted as requested */}
          <TouchableOpacity
            style={[
              styles.serviceItem,
              selectedService === "auto" && styles.selectedItem,
            ]}
            onPress={() => setSelectedService("auto")}
          >
            <MaterialCommunityIcons
              name="rickshaw"
              size={40}
              color={Colors.secondary}
            />
            <View style={styles.serviceInfo}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>Auto</Text>
                <Ionicons
                  name="person"
                  size={12}
                  color="#666"
                  style={{ marginLeft: 5 }}
                />
                <Text style={styles.passengerCount}>3</Text>
              </View>
              <Text style={styles.serviceDetails}>
                3 mins away • Drop 5:36 pm
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹51-₹75</Text>
            </View>
          </TouchableOpacity>

          {/* Placeholder for other services to show Rapido layout */}
          <View style={[styles.serviceItem, { opacity: 0.5 }]}>
            <MaterialCommunityIcons name="motorbike" size={40} color="#666" />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>Bike</Text>
              <Text style={styles.serviceDetails}>3 mins away • FASTEST</Text>
            </View>
            <Text style={styles.price}>₹46</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.paymentRow}>
            <TouchableOpacity style={styles.paymentMethod}>
              <Ionicons
                name="cash-outline"
                size={20}
                color={Colors.secondary}
              />
              <Text style={styles.paymentText}>Cash</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.secondary}
              />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.paymentMethod}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color={Colors.secondary}
              />
              <Text style={styles.paymentText}>Offers</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.secondary}
              />
            </TouchableOpacity>
          </View>

          <RapidoButton
            title={`Book Auto`}
            onPress={handleBookRide}
            style={styles.bookButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    maxHeight: height * 0.5,
    elevation: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
  },
  discountText: {
    color: "#2E7D32",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
    backgroundColor: "#F1F8E9",
    fontSize: 14,
  },
  serviceList: {
    padding: 16,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 10,
  },
  selectedItem: {
    borderColor: Colors.secondary,
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 15,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
  },
  passengerCount: {
    fontSize: 12,
    color: "#666",
    marginLeft: 2,
  },
  serviceDetails: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
  },
  footer: {
    paddingHorizontal: 16,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 12,
  },
  paymentMethod: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentText: {
    marginHorizontal: 8,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "#E0E0E0",
  },
  bookButton: {
    backgroundColor: Colors.primary,
  },
});
