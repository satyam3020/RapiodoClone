import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Switch,
  Alert,
} from "react-native";
import FreeMap from "../../components/FreeMap";
import { AppContext } from "../../context/AppContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const { width, height } = Dimensions.get("window");

export default function DriverDashboardScreen({ navigation }) {
  const {
    driverStats,
    incomingRequests,
    setIncomingRequests,
    setActiveRide,
    location,
    setUser,
    setRole,
    t,
  } = useContext(AppContext);
  const [isOnline, setIsOnline] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isGoToModalOpen, setIsGoToModalOpen] = useState(false);
  const [isGemsModalOpen, setIsGemsModalOpen] = useState(false);
  const [isOrdersFilterOpen, setIsOrdersFilterOpen] = useState(false);
  const [isAutoAcceptOn, setIsAutoAcceptOn] = useState(true);
  const [isGoToDropdownOpen, setIsGoToDropdownOpen] = useState(false);
  const [goToAreas, setGoToAreas] = useState([
    { name: "HSR Layout", active: true },
    { name: "Koramangala", active: false },
    { name: "Nagawara", active: false },
  ]);

  const handleLogout = () => {
    setUser(null);
    setRole(null);
  };

  const handleAccept = (request) => {
    setIncomingRequests([]);
    setActiveRide({ ...request, status: "accepted" });
  };

  const handleReject = () => {
    setIncomingRequests([]);
  };

  const handleNotificationClick = () => {
    Alert.alert("No new notifications", "You are all caught up!");
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
        <Ionicons name="menu" size={32} color="black" />
      </TouchableOpacity>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isOnline ? t("driverDash.online") : t("driverDash.offline")}
        </Text>
        <Switch
          value={isOnline}
          onValueChange={setIsOnline}
          trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
          thumbColor={isOnline ? "#4CAF50" : "#f4f3f4"}
        />
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => setIsGoToModalOpen(true)}>
          <Ionicons
            name="location"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotificationClick}>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEarningsBar = () => (
    <View style={styles.earningsBar}>
      <Text style={styles.earningsText}>{t("driverDash.todaysEarnings")}</Text>
      <View style={styles.earningsAmountWrap}>
        <Text style={styles.earningsAmount}>₹219</Text>
        <Ionicons name="chevron-down" size={20} color="black" />
      </View>
    </View>
  );

  const renderOfflineContent = () => (
    <ScrollView
      style={styles.offlineContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Promo Banner */}
      <View style={styles.promoBanner}>
        <View style={styles.promoTextCol}>
          <View style={styles.promoBadge}>
            <Text style={styles.promoBadgeText}>{t("driverDash.bluePerformance")}</Text>
          </View>
          <Text style={styles.promoTitle}>{t("driverDash.completedOrdersText")}</Text>
          <TouchableOpacity style={styles.promoLink}>
            <Text style={styles.promoLinkText}>
              {t("driverDash.andKnowMore")}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Simulated person illustration */}
        <View style={styles.promoImagePlaceholder}>
          <Ionicons name="person-circle" size={80} color="#E0E0E0" />
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greetingSection}>
        <View style={styles.greetingIcons}>
          <Ionicons name="cash-outline" size={40} color={Colors.primary} />
          <MaterialCommunityIcons name="hand-peace" size={40} color="#FFCC80" />
        </View>
        <Text style={styles.greetingName}>{t("driverDash.greeting")} vijay pandey</Text>
        <Text style={styles.greetingTime}>{t("driverDash.goodEvening")}</Text>
      </View>

      {/* Action Bubbles */}
      <View style={styles.actionBubblesContainer}>
        <View style={styles.actionBubbleCol}>
          <View style={styles.bubbleHolder}>
            <TouchableOpacity
              style={[styles.bubble, styles.bubbleBlue]}
              onPress={() => setIsGemsModalOpen(true)}
            >
              <Ionicons name="diamond" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>0</Text>
            </View>
          </View>
          <Text style={styles.bubbleLabel}>{t("driverDash.gems")}</Text>
        </View>

        <View style={[styles.dividerVertical, { marginHorizontal: 15 }]} />

        <View style={styles.actionBubbleCol}>
          <TouchableOpacity
            style={[styles.bubble, styles.bubbleGrey]}
            onPress={() => setIsOrdersFilterOpen(true)}
          >
            <Ionicons name="settings" size={35} color="black" />
            <Text style={styles.tinyLabel}>Filters</Text>
          </TouchableOpacity>
          <Text style={styles.bubbleLabel}>{t("driverDash.filters")}</Text>
        </View>

        <View style={styles.actionBubbleCol}>
          <TouchableOpacity
            style={[styles.bubble, styles.bubblePink]}
            onPress={() => setIsGoToModalOpen(true)}
          >
            <Ionicons name="location" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.bubbleLabel}>{t("driverDash.goTo")}</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderOnlineContent = () => (
    <View style={styles.onlineContent}>
      <View style={styles.overviewSelector}>
        <Text style={styles.overviewText}>{t("driverDash.overview")}</Text>
        <Ionicons name="chevron-down" size={20} color="black" />
      </View>

      <FreeMap
        style={styles.map}
        initialRegion={
          location || {
            latitude: 19.2333,
            longitude: 72.8633,
          }
        }
        markers={[{ latitude: 19.2333, longitude: 72.8633 }]}
      />

      <View style={styles.mapSideActions}>
        <TouchableOpacity style={styles.mapSideBtn}>
          <Ionicons name="locate" size={24} color="#1A73E8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapSideBtn}>
          <Ionicons name="alert-circle" size={24} color="#D32F2F" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomOverlayActions}>
        <View style={styles.pillActionsRow}>
          <TouchableOpacity style={styles.pillBtn}>
            <Ionicons
              name="arrow-up-circle"
              size={20}
              color="#D32F2F"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.pillText}>{t("driverDash.surge")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pillBtn}
            onPress={() => setIsGoToModalOpen(true)}
          >
            <Ionicons
              name="location"
              size={20}
              color="#E91E63"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.pillText}>{t("driverDash.goTo")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pillBtnIconOnly}
            onPress={() => setIsOrdersFilterOpen(true)}
          >
            <Ionicons name="options" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.pullUpSheet}>
          <Ionicons
            name="chevron-up"
            size={24}
            color="#9E9E9E"
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    </View>
  );

  const renderRideRequestModal = () => (
    <Modal
      visible={incomingRequests.length > 0 && isOnline}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.requestCard}>
          {/* Top Pink Header Section */}
          <View style={styles.requestHeaderPink}>
            <View style={styles.requestGoToTag}>
              <Ionicons
                name="car"
                size={14}
                color="white"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.requestGoToText}>Go To</Text>
            </View>
            <View style={styles.requestHeaderContent}>
              <Text style={styles.requestPrice}>₹ 146</Text>
              {/* Dummy Heart Pin graphic */}
              <View style={styles.heartPinCircle}>
                <Ionicons name="heart" size={28} color="#E91E63" />
              </View>
            </View>
          </View>

          {/* Bottom White Section */}
          <View style={styles.requestBodyWhite}>
            <View style={styles.routeContainer}>
              <View style={styles.routeLineContainer}>
                <View style={styles.dotGrey} />
                <View style={styles.verticalLineGrey} />
                <View style={styles.dotGrey} />
              </View>
              <View style={styles.routeDetailsContainer}>
                <View style={styles.routeStep}>
                  <Text style={styles.distanceText}>1.2 km</Text>
                  <Text style={styles.addressTextBold}>
                    Sec 3 HSR,{" "}
                    <Text style={styles.addressTextLight}>
                      22nd Cross Rd, 1st Main, 2nd Block, HSR Layout - 560020
                    </Text>
                  </Text>
                </View>
                <View style={styles.routeStep}>
                  <Text style={styles.distanceText}>6.5 km</Text>
                  <Text style={styles.addressTextBold}>
                    Bellandur,{" "}
                    <Text style={styles.addressTextLight}>
                      Salarpuria Serenity Apartments, 7th sector, Bellandur -
                      560020
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.requestActionRow}>
              <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
                <Ionicons name="remove" size={30} color="#757575" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptBtnYellow}
                onPress={() => handleAccept(incomingRequests[0])}
              >
                <Text style={styles.acceptBtnText}>{t("driverDash.accept")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderDrawer = () => (
    <Modal
      visible={isDrawerOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsDrawerOpen(false)}
    >
      {/* Same drawer implementation kept for brevity */}
      <View style={styles.drawerOverlay}>
        <TouchableOpacity
          style={styles.drawerCloseArea}
          onPress={() => setIsDrawerOpen(false)}
        />
        <View style={styles.drawerContentCard}>
          <View style={styles.drawerHeaderBg}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Ionicons name="person" size={30} color="#757575" />
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {t("userHome.navProfile")}
                </Text>
                <Text style={{ color: "#1A73E8", fontSize: 16 }}>
                  Blue {">"}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView style={{ paddingTop: 10 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                setIsDrawerOpen(false);
                navigation.navigate("DriverEarnings");
              }}
            >
              <Ionicons
                name="wallet-outline"
                size={24}
                color="#424242"
                style={{ marginRight: 15 }}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: "#424242", fontWeight: "bold" }}
                >
                  {t("driverDash.drawerEarnings")}
                </Text>
                <Text style={{ fontSize: 12, color: "#757575" }}>
                  {t("driverDash.drawerEarningsSub")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                setIsDrawerOpen(false);
                navigation.navigate("DriverAccessFee");
              }}
            >
              <MaterialCommunityIcons
                name="brightness-percent"
                size={24}
                color="#424242"
                style={{ marginRight: 15 }}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: "#424242", fontWeight: "bold" }}
                >
                  {t("driverDash.drawerAccessFee")}
                </Text>
                <Text style={{ fontSize: 12, color: "#757575" }}>
                  {t("driverDash.drawerAccessFeeSub")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                setIsDrawerOpen(false);
                navigation.navigate("DriverMilesBonus");
              }}
            >
              <Ionicons
                name="cash-outline"
                size={24}
                color="#424242"
                style={{ marginRight: 15 }}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: "#424242", fontWeight: "bold" }}
                >
                  {t("driverDash.drawerMilesBonus")}
                </Text>
                <Text style={{ fontSize: 12, color: "#757575" }}>
                  {t("driverDash.drawerMilesBonusSub")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                setIsDrawerOpen(false);
                navigation.navigate("DriverRewards");
              }}
            >
              <Ionicons
                name="gift-outline"
                size={24}
                color="#424242"
                style={{ marginRight: 15 }}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: "#424242", fontWeight: "bold" }}
                >
                  {t("driverDash.drawerRewards")}
                </Text>
                <Text style={{ fontSize: 12, color: "#757575" }}>
                  {t("driverDash.drawerRewardsSub")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                setIsDrawerOpen(false);
                navigation.navigate("DriverServiceManager");
              }}
            >
              <Ionicons
                name="grid-outline"
                size={24}
                color="#424242"
                style={{ marginRight: 15 }}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: "#424242", fontWeight: "bold" }}
                >
                  {t("driverDash.drawerServiceMgr")}
                </Text>
                <Text style={{ fontSize: 12, color: "#757575" }}>
                  {t("driverDash.drawerServiceMgrSub")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                setIsDrawerOpen(false);
                navigation.navigate("DriverHelp");
              }}
            >
              <Ionicons
                name="headset-outline"
                size={24}
                color="#424242"
                style={{ marginRight: 15 }}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: "#424242", fontWeight: "bold" }}
                >
                  {t("driverDash.drawerHelp")}
                </Text>
                <Text style={{ fontSize: 12, color: "#757575" }}>
                  {t("driverDash.drawerHelpSub")}
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                height: 1,
                backgroundColor: "#E0E0E0",
                marginVertical: 10,
              }}
            />

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color="#D32F2F"
                style={{ marginRight: 15 }}
              />
              <Text
                style={{ fontSize: 18, color: "#D32F2F", fontWeight: "bold" }}
              >
                {t("driverDash.drawerLogout")}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "#F3E5F5",
                padding: 15,
                marginHorizontal: 15,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 40,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="people"
                size={30}
                color="#9C27B0"
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, color: "#4A148C" }}>
                  {t("driverDash.referFriend")}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}
                >
                  {t("driverDash.referBtn")}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderGoToModal = () => (
    <Modal visible={isGoToModalOpen} animationType="slide">
      <SafeAreaView style={styles.goToContainer}>
        {/* Header is constant for all slides */}
        <View style={styles.goToHeader}>
          <TouchableOpacity onPress={() => setIsGoToModalOpen(false)}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.goToTitle}>Go To Area</Text>
          <Ionicons
            name="share-social"
            size={24}
            color="black"
            style={{ marginLeft: "auto", marginRight: 15 }}
          />
          <Ionicons
            name="close"
            size={28}
            color="black"
            onPress={() => setIsGoToModalOpen(false)}
          />
        </View>

        {/* Horizontal Scroll view to simulate the sliding pages */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {/* Page 1: Intro */}
          <View style={styles.goToSlide}>
            {/* Placeholder graphic for intro */}
            <View style={styles.goToIntroGraphic}>
              <Ionicons name="location" size={100} color="#E91E63" />
            </View>
            <View style={styles.goToIntroContent}>
              <Text style={styles.goToIntroTitle}>Go to Area</Text>
              <Text style={styles.goToIntroDesc}>
                Get orders to home or anywhere you want to go
              </Text>
              <View style={styles.goToIntroFeature}>
                <Ionicons name="caret-forward" size={16} color="black" />
                <Text style={styles.goToIntroFeatureText}>
                  Use multiple times
                </Text>
              </View>
              <View style={styles.goToIntroFeature}>
                <Ionicons name="caret-forward" size={16} color="black" />
                <Text style={styles.goToIntroFeatureText}>
                  Switch ON multiple areas
                </Text>
              </View>
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={styles.goToYellowBtn}>
                <Text style={styles.goToYellowBtnText}>Add Area</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Page 2: Hello Captains */}
          <View
            style={[
              styles.goToSlide,
              {
                backgroundColor: "#FFCC80",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text style={styles.helloCaptainsText}>Hello{"\n"}Captains</Text>
            <View style={styles.helloCaptainsCircle}>
              <Ionicons name="location" size={60} color="#F48FB1" />
              <Ionicons
                name="heart"
                size={20}
                color="white"
                style={{ position: "absolute", top: 38 }}
              />
            </View>
          </View>

          {/* Page 3: Saved Areas list */}
          <View style={styles.goToSlide}>
            <ScrollView contentContainerStyle={styles.goToScroll}>
              <View style={styles.goToBanner}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.goToBannerText}>
                    Get orders to your home or anywhere you want to go
                  </Text>
                  <Text style={styles.goToBannerLink}>Know more</Text>
                </View>
                <Ionicons name="location" size={50} color="#E91E63" />
              </View>

              <Text style={styles.goToSectionTitle}>
                Saved drop areas (Switch ON up to 3)
              </Text>

              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.goToCard}>
                  <View style={styles.goToCardLeft}>
                    <Text style={styles.goToCardTitle}>
                      HSR Layout Sector 7
                    </Text>
                    <View style={styles.goToCardDeleteRow}>
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color="#757575"
                      />
                      <Text style={styles.goToCardDeleteText}>Delete</Text>
                    </View>
                  </View>
                  <Switch value={false} disabled={true} />
                </View>
              ))}

              <TouchableOpacity style={styles.addAreaBtn}>
                <Text style={styles.addAreaBtnText}>Add new Area</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderGemsModal = () => (
    <Modal visible={isGemsModalOpen} animationType="slide">
      <SafeAreaView style={styles.gemsContainer}>
        <View style={styles.gemsHeader}>
          <TouchableOpacity onPress={() => setIsGemsModalOpen(false)}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.gemsTitle}>{t("driverDash.gemsTitle")}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.gemsScroll}>
          <View style={styles.gemsBalanceRow}>
            <Ionicons name="diamond" size={60} color="#2962FF" />
            <Text style={styles.gemsBalanceLabel}>0</Text>
          </View>
          <Text style={styles.gemsSubLabel}>{t("driverDash.gemsSubLabel")}</Text>

          <View style={styles.dividerFull} />

          <Text style={styles.gemsSectionTitle}>{t("driverDash.redeemCash")}</Text>

          <View style={styles.gemsGrid}>
            {/* Card ₹20 */}
            <View style={[styles.gemCard, { backgroundColor: "#E6EE9C" }]}>
              <Text style={styles.gemCardTopText}>{t("driverDash.getCash")}</Text>
              <Text style={styles.gemCardAmount}>₹20</Text>
              <View style={styles.gemLockCircle}>
                <Ionicons name="lock-closed" size={24} color="white" />
              </View>
              <View style={styles.gemCostPill}>
                <Ionicons name="diamond" size={14} color="#E0E0E0" />
                <Text style={styles.gemCostText}>{t("driverDash.n_gems").replace("{n}", "2")}</Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color="white"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </View>

            {/* Card ₹50 */}
            <View style={[styles.gemCard, { backgroundColor: "#B2DFDB" }]}>
              <Text style={styles.gemCardTopText}>{t("driverDash.getCash")}</Text>
              <Text style={styles.gemCardAmount}>₹50</Text>
              <View style={styles.gemLockCircle}>
                <Ionicons name="lock-closed" size={24} color="white" />
              </View>
              <View style={styles.gemCostPill}>
                <Ionicons name="diamond" size={14} color="#E0E0E0" />
                <Text style={styles.gemCostText}>{t("driverDash.n_gems").replace("{n}", "5")}</Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color="white"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </View>

            {/* Card ₹100 */}
            <View style={[styles.gemCard, { backgroundColor: "#C5CAE9" }]}>
              <Text style={styles.gemCardTopText}>{t("driverDash.getCash")}</Text>
              <Text style={styles.gemCardAmount}>₹100</Text>
              <View style={styles.gemLockCircle}>
                <Ionicons name="lock-closed" size={24} color="white" />
              </View>
              <View style={styles.gemCostPill}>
                <Ionicons name="diamond" size={14} color="#E0E0E0" />
                <Text style={styles.gemCostText}>{t("driverDash.n_gems").replace("{n}", "10")}</Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color="white"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </View>

            {/* Card ₹200 */}
            <View style={[styles.gemCard, { backgroundColor: "#FFCCBC" }]}>
              <Text style={styles.gemCardTopText}>{t("driverDash.getCash")}</Text>
              <Text style={styles.gemCardAmount}>₹200</Text>
              <View style={styles.gemLockCircle}>
                <Ionicons name="lock-closed" size={24} color="white" />
              </View>
              <View style={styles.gemCostPill}>
                <Ionicons name="diamond" size={14} color="#E0E0E0" />
                <Text style={styles.gemCostText}>{t("driverDash.n_gems").replace("{n}", "20")}</Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color="white"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderOrdersFilterModal = () => (
    <Modal visible={isOrdersFilterOpen} animationType="fade">
      <SafeAreaView style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <TouchableOpacity
            onPress={() => setIsOrdersFilterOpen(false)}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.filterTitle}>
            {incomingRequests.length > 0 ? "1 Order" : "0 Orders"}
          </Text>
          <View style={styles.filterToggleBg}>
            <Text style={styles.filterToggleText}>ON</Text>
            <Ionicons
              name="volume-high"
              size={16}
              color="white"
              style={{ marginLeft: 4 }}
            />
          </View>
        </View>

        <View style={styles.filterBody}>
          <View style={[styles.filterTabRow, { zIndex: 11 }]}>
            <TouchableOpacity
              style={[
                styles.filterTab,
                isGoToDropdownOpen || incomingRequests.length > 0
                  ? { backgroundColor: "#FFCDD2" }
                  : { backgroundColor: "white" },
              ]}
              onPress={() => setIsGoToDropdownOpen(!isGoToDropdownOpen)}
            >
              <Ionicons name="location" size={16} color="#757575" />
              <Text style={styles.filterTabText}>Go To</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTab}>
              <Ionicons name="settings-outline" size={16} color="#757575" />
              <Text style={styles.filterTabText}>Services</Text>
            </TouchableOpacity>
          </View>

          {/* Pink Dropdown */}
          {isGoToDropdownOpen && (
            <View style={styles.goToDropdownMenu}>
              {goToAreas.map((area, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.goToDropdownItem,
                    area.active
                      ? { borderWidth: 1, borderColor: "#4CAF50" }
                      : null,
                  ]}
                >
                  <Text style={styles.goToDropdownItemText}>{area.name}</Text>
                  <Switch
                    value={area.active}
                    onValueChange={(val) => {
                      const newAreas = [...goToAreas];
                      newAreas[idx].active = val;
                      setGoToAreas(newAreas);
                    }}
                    trackColor={{ false: "#9E9E9E", true: "#A5D6A7" }}
                    thumbColor={area.active ? "#4CAF50" : "#f4f3f4"}
                  />
                </View>
              ))}
              <View style={styles.goToDropdownFooter}>
                <TouchableOpacity style={styles.goToAddAreaBtn}>
                  <Ionicons name="add" size={16} color="#424242" />
                  <Text style={styles.goToAddAreaText}>Add Area</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.goToStopBtn}
                  onPress={() => setIsGoToDropdownOpen(false)}
                >
                  <Ionicons name="close" size={16} color="#D32F2F" />
                  <Text style={styles.goToStopText}>Stop Go To</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!isGoToDropdownOpen && incomingRequests.length === 0 && (
            <View style={styles.emptyFilterBox}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="search-outline" size={60} color="#9E9E9E" />
              </View>
              <Text style={styles.emptyFilterTitle}>
                {t("driverDash.noActiveOrders")}
              </Text>
              <Text style={styles.emptyFilterSubText}>
                {t("driverDash.ordersFilterSubtext")}
              </Text>
            </View>
          )}

          {!isGoToDropdownOpen && incomingRequests.length > 0 && (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10, flexGrow: 0 }}
            >
              {[1, 2, 3].map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.requestCard,
                    { elevation: 3, width: width - 40, marginRight: 20 },
                  ]}
                >
                  {/* Top Pink Header Section */}
                  <View style={[styles.requestHeaderPink, { padding: 15 }]}>
                    <View style={styles.requestGoToTag}>
                      <Ionicons
                        name="car"
                        size={14}
                        color="white"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.requestGoToText}>Go To</Text>
                    </View>
                    <View style={styles.requestHeaderContent}>
                      <Text style={styles.requestPrice}>₹ 146</Text>
                      <View style={styles.heartPinCircle}>
                        <Ionicons name="location" size={28} color="#FFCDD2" />
                      </View>
                    </View>
                  </View>

                  {/* Bottom White Section */}
                  <View style={[styles.requestBodyWhite, { padding: 15 }]}>
                    <View style={styles.routeContainer}>
                      <View style={styles.routeLineContainer}>
                        <View style={styles.dotGrey} />
                        <View style={styles.verticalLineGrey} />
                        <View style={styles.dotGrey} />
                      </View>
                      <View style={styles.routeDetailsContainer}>
                        <View style={styles.routeStep}>
                          <Text style={styles.distanceText}>1.2 km</Text>
                          <Text style={styles.addressTextBold}>
                            Sec 3 HSR,{" "}
                            <Text style={styles.addressTextLight}>
                              22nd Cross Rd, HSR Layout - 560020
                            </Text>
                          </Text>
                        </View>
                        <View style={styles.routeStep}>
                          <Text style={styles.distanceText}>6.5 km</Text>
                          <Text style={styles.addressTextBold}>
                            Bellandur,{" "}
                            <Text style={styles.addressTextLight}>
                              Salarpuria Serenity, Bellandur - 560020
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.requestActionRow}>
                      <TouchableOpacity
                        style={styles.rejectBtn}
                        onPress={handleReject}
                      >
                        <Ionicons name="remove" size={30} color="#757575" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.acceptBtnYellow}
                        onPress={() => {
                          handleAccept(incomingRequests[0]);
                          setIsOrdersFilterOpen(false);
                        }}
                      >
                        <Text style={styles.acceptBtnText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderEarningsBar()}

      {isOnline ? renderOnlineContent() : renderOfflineContent()}

      {renderDrawer()}
      {renderGoToModal()}
      {renderGemsModal()}
      {renderOrdersFilterModal()}
      {/* Show ride request on main dashboard too */}
      {!isOrdersFilterOpen && renderRideRequestModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  toggleText: { fontWeight: "bold", marginRight: 8, color: "#424242" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  earningsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  earningsText: { fontSize: 16, color: "#1A237E", fontWeight: "bold" },
  earningsAmountWrap: { flexDirection: "row", alignItems: "center" },
  earningsAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },

  // Offline Styles
  offlineContent: { flex: 1, backgroundColor: "#FFFFFF" },
  promoBanner: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoTextCol: { flex: 1 },
  promoBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  promoBadgeText: { color: "#1A73E8", fontSize: 12, fontWeight: "bold" },
  promoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A73E8",
    marginBottom: 8,
  },
  promoLinkText: { color: "#1A73E8", fontWeight: "bold" },
  promoImagePlaceholder: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingSection: { alignItems: "center", marginTop: 15, marginBottom: 20 },
  greetingIcons: { flexDirection: "row", marginBottom: 10 },
  greetingName: { fontSize: 18, color: "#424242", marginBottom: 4 },
  greetingTime: { fontSize: 22, fontWeight: "bold", color: "#000" },
  actionBubblesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    borderBottomWidth: 0,
  },
  actionBubbleCol: { alignItems: "center" },
  bubbleHolder: { alignItems: "center", justifyContent: "center" },
  bubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#FFF",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bubbleBlue: { backgroundColor: "#5C6BC0" },
  bubbleGrey: {
    backgroundColor: "#E0E0E0",
    borderColor: "#FCE4EC",
    borderWidth: 4,
  },
  bubblePink: {
    backgroundColor: "#F06292",
    borderColor: "#FCE4EC",
    borderWidth: 4,
  },
  badgeCount: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#4A148C",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  badgeCountText: { color: "white", fontWeight: "bold" },
  tinyLabel: { fontSize: 8, fontWeight: "bold", marginTop: 2 },
  bubbleLabel: { fontSize: 14, color: "#424242", fontWeight: "500" },
  dividerVertical: { width: 1, height: 40, backgroundColor: "#E0E0E0" },
  // Online Styles
  onlineContent: { flex: 1 },
  overviewSelector: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 4,
    zIndex: 10,
  },
  overviewText: { fontWeight: "bold", marginRight: 5, fontSize: 16 },
  map: { flex: 1 },
  driverMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(26, 115, 232, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  driverMarkerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1A73E8",
    borderWidth: 2,
    borderColor: "white",
  },
  mapSideActions: { position: "absolute", right: 16, top: 150 },
  mapSideBtn: {
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 4,
  },
  bottomOverlayActions: { position: "absolute", bottom: 0, width: "100%" },
  pillActionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  pillBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    elevation: 4,
  },
  pillText: { fontWeight: "bold" },
  pillBtnIconOnly: {
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 4,
  },
  pullUpSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 10,
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#EFEFEF",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center", justifyContent: "center" },
  navTextActive: { fontSize: 12, fontWeight: "bold", color: "#000" },
  ordersButton: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  ordersButtonText: { fontWeight: "bold", color: "black" },
  ordersButtonActive: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  ordersButtonTextActive: { fontWeight: "bold", color: "white" },

  // Enhanced Ride Request Modal (Image 5)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  requestCard: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 20,
    overflow: "hidden",
  },
  requestHeaderPink: {
    backgroundColor: "#FFCDD2",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  requestGoToTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#757575",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  requestGoToText: { color: "white", fontSize: 10, fontWeight: "bold" },
  requestHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestPrice: { fontSize: 32, fontWeight: "bold", color: "#000" },
  heartPinCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  requestBodyWhite: {
    backgroundColor: "white",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  routeContainer: { flexDirection: "row", marginBottom: 20 },
  routeLineContainer: {
    width: 20,
    alignItems: "center",
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dotGrey: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9E9E9E",
  },
  verticalLineGrey: {
    width: 2,
    flex: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 4,
  },
  routeDetailsContainer: { flex: 1 },
  routeStep: { marginBottom: 15 },
  distanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  addressTextBold: { fontSize: 14, fontWeight: "bold", color: "#424242" },
  addressTextLight: { fontWeight: "normal", color: "#757575" },
  requestActionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  rejectBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  acceptBtnYellow: {
    flex: 1,
    backgroundColor: "#FFC107",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptBtnText: { fontSize: 18, fontWeight: "bold", color: "#000" },

  // Go To Modal (Images for slide flow)
  goToContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  goToHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  goToTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#000",
  },
  goToSlide: { width: width, backgroundColor: "#FFFFFF" },
  goToIntroGraphic: {
    width: "100%",
    height: 250,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
  },
  goToIntroContent: { flex: 1, padding: 20, backgroundColor: "white" },
  goToIntroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: "#D32F2F",
    alignSelf: "flex-start",
  },
  goToIntroDesc: {
    fontSize: 16,
    color: "#424242",
    fontWeight: "bold",
    marginBottom: 20,
  },
  goToIntroFeature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  goToIntroFeatureText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
    fontWeight: "bold",
  },
  goToYellowBtn: {
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  goToYellowBtnText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  helloCaptainsText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 40,
  },
  helloCaptainsCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFCDD2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: "#000",
  },

  goToScroll: { flexGrow: 1, padding: 20, backgroundColor: "#FFF2CC" },
  goToBanner: {
    backgroundColor: "#FFCDD2",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  goToBannerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  goToBannerLink: { fontSize: 14, color: "#1A73E8" },
  goToSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  goToCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  goToCardLeft: { flex: 1 },
  goToCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 6,
  },
  goToCardDeleteRow: { flexDirection: "row", alignItems: "center" },
  goToCardDeleteText: { fontSize: 12, color: "#757575", marginLeft: 4 },
  addAreaBtn: {
    backgroundColor: "white",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  addAreaBtnText: { fontSize: 16, fontWeight: "bold", color: "#000" },

  // Gems UI Card (Image 4)
  gemsContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  gemsHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  gemsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#000",
  },
  gemsScroll: { padding: 20 },
  gemsBalanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  gemsBalanceLabel: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  gemsSubLabel: { fontSize: 16, color: "#424242", marginBottom: 20 },
  dividerFull: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginHorizontal: -20,
    marginBottom: 20,
  },
  gemsSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  gemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gemCard: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    height: 160,
  },
  gemCardTopText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "bold",
  },
  gemCardAmount: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 36,
    fontWeight: "bold",
  },
  gemLockCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  gemCostPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: "auto",
  },
  gemCostText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },

  // Orders Filter Modal (Image 4)
  filterContainer: { flex: 1, backgroundColor: "#F5F5F5" },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  filterTitle: { flex: 1, fontSize: 18, fontWeight: "bold", color: "#000" },
  filterToggleBg: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#388E3C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterToggleText: { color: "white", fontWeight: "bold", fontSize: 12 },
  filterBody: { flex: 1, padding: 20, backgroundColor: "#E0E0E0" },
  filterTabRow: { flexDirection: "row", marginBottom: 20 },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#424242",
    marginLeft: 4,
  },
  emptyFilterBox: {
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  emptyFilterTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyFilterSubText: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 22,
  },

  // Pink Dropdown inside Orders Filter
  goToDropdownMenu: {
    backgroundColor: "#FFCDD2",
    borderRadius: 16,
    padding: 15,
    position: "absolute",
    top: 60,
    left: 20,
    width: 280,
    zIndex: 10,
    elevation: 5,
  },
  goToDropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  goToDropdownItemText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  goToDropdownFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  goToAddAreaBtn: { flexDirection: "row", alignItems: "center" },
  goToAddAreaText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#424242",
    marginLeft: 4,
  },
  goToStopBtn: { flexDirection: "row", alignItems: "center" },
  goToStopText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D32F2F",
    marginLeft: 4,
  },

  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawerCloseArea: { flex: 1 },
  drawerContentCard: {
    width: "85%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: 0,
    top: 0,
  },
  drawerHeaderBg: {
    backgroundColor: "#1A73E8",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  drawerProfileName: { color: "white", fontSize: 22, fontWeight: "bold" },
});
