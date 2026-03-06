import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { RapidoButton } from "../../components/RapidoButton";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../../context/AppContext";

const { width, height } = Dimensions.get("window");

export default function DriverDocumentUploadScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const { setUser, setRole } = useContext(AppContext);

  const finishUpload = (uri) => {
    setImage(uri);
    Alert.alert("Success", "प्रोफ़ाइल पूरी हो गई! (Profile Complete!)", [
      {
        text: "OK",
        onPress: () => {
          setUser({ id: "driver_new", name: "Auto Driver" });
          setRole("driver");
        },
      },
    ]);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission needed", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      finishUpload(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      finishUpload(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera View Simulation or Actual Selected Image */}
      <View style={styles.cameraView}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        ) : (
          <>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>

              <View style={styles.headerRight}>
                <View style={styles.langBubble}>
                  <Text style={styles.langText}>अ/A</Text>
                </View>
                <TouchableOpacity style={styles.helpButton}>
                  <Ionicons name="headset" size={16} color="black" />
                  <Text style={styles.helpText}>हेल्प</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Camera controls simulation */}
            <View style={styles.cameraControls}>
              <Ionicons
                name="volume-high"
                size={28}
                color="white"
                style={styles.cameraIcon}
              />
              <Ionicons
                name="sync"
                size={28}
                color="white"
                style={styles.cameraIcon}
              />
            </View>

            {/* Focus Bracket Simulation */}
            <View style={styles.focusBracket} />
          </>
        )}
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>ड्राइविंग लाइसेंस अपलोड करें</Text>
        <Text style={styles.subtitle}>आपके DL का एक तरफ</Text>

        <RapidoButton
          title="फोटो खींचें"
          icon={
            <Ionicons
              name="camera"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
          onPress={openCamera}
          style={styles.primaryButton}
          textStyle={styles.primaryButtonText}
        />

        <TouchableOpacity style={styles.secondaryButton} onPress={openGallery}>
          <Ionicons
            name="image-outline"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.secondaryButtonText}>गैलरी से अपलोड करें</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Camera background
  },
  cameraView: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  langBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  langText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  helpText: {
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 16,
  },
  cameraControls: {
    position: "absolute",
    right: 24,
    top: 100,
    alignItems: "center",
  },
  cameraIcon: {
    marginBottom: 30,
  },
  focusBracket: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 60,
    height: 60,
    marginLeft: -30,
    marginTop: -30,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    borderStyle: "dashed",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#616161",
    textAlign: "center",
    marginBottom: 30,
  },
  primaryButton: {
    borderRadius: 30,
    marginBottom: 16,
    flexDirection: "row",
  },
  primaryButtonText: {
    color: "#000000",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 16,
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
