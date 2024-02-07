import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,Modal,Button,TouchableOpacity } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import logoIcon from "../assets/logoIcon.png";
import turbidity from "../assets/turbidity.png";
import ph from "../assets/ph.png";
import sidebarIcon from "../assets/menu.png";
import sidebarLogo from "../assets/sidebarIcon.png";
import aboutus from '../assets/aboutus.png';
import toc from '../assets/toc.png';
import faqs from '../assets/faqs.png';
import data from "../services/firebase/gaugeReadData";

const HomeScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const phraw = data("pH_Level/ph_Level_Values");
  const tbraw = data("Turbidity_Level/Turbidity_Level_Values");
  const phValue = parseFloat(phraw);
  const turbValue = parseFloat(tbraw);

  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good Morning!";
  } else if (hour < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentTime.toLocaleDateString(undefined, dateOptions);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          {/* Date and Greetings */}
          <View style={styles.dateGreetingsContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.greetings}>{greeting}</Text>
          </View>
          {/* Side Bar Icon */}
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={toggleSidebar}>
          <Image source={sidebarIcon} style={styles.sidebarIcon} />
        </TouchableOpacity>
        {/* Sidebar */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSidebarVisible}
          onRequestClose={toggleSidebar}
        >
          <View style={styles.sidebarContainer}>
            {/* Sidebar Logo */}
            <View style={styles.sidebarHeader}>
              <Image source={sidebarLogo} style={styles.sidebarLogo} />
            </View>
            {/* Sidebar Items */}
            <View style={styles.sidebarItems}>
              <TouchableOpacity style={styles.sidebarItem}>
                <Image source={aboutus} style={styles.sbicon} />
                <Text style={styles.sidebarItemText}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                <Image source={toc} style={styles.sbicon} />
                <Text style={styles.sidebarItemText}>Terms & Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                <Image source={faqs} style={styles.sbicon} />
                <Text style={styles.sidebarItemText}>FAQs</Text>
              </TouchableOpacity>
            </View>

            {/* Exit Button */}
            <View style={styles.sidebarExit}>
              <Button title="Close" color="#255C99" onPress={toggleSidebar} />
            </View>
          </View>
        </Modal>
        </View>
      </View>
      <View style={styles.fillOut}>
        {/* Logo Image */}
        <View style={styles.logoImageContainer}>
          <Image source={logoIcon} style={styles.logoImage} />
        </View>
        <Text style={styles.title}>Alkaline Water</Text>
        <Text style={styles.title}>Monitoring System</Text>
        {/* Container 1 */}
        <View style={styles.container1}>
          {/* Left Section */}
          <View style={styles.leftSection1}>
            <Image source={ph} style={styles.icon} />
            <Text style={styles.containerTitle1}>pH</Text>
          </View>
          {/* Right Section */}
          <View style={styles.rightSection1}>
            {/* Circular Gauge */}
            <Svg width="100" height="100">
              {/* Background Circle */}
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E1E1E1"
                strokeWidth="10"
                fill="transparent"
              />
              {/* pH Value Circle */}
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#7EA3CC"
                strokeWidth="10"
                strokeDasharray={`${(phValue / 15) * 282.5} 565`}
                strokeLinecap="butt"
                fill="transparent"
              />
              {/* Text Displaying pH Value */}
              <SvgText
                x="50%"
                y="50%"
                fontSize="16"
                textAnchor="middle"
                fill="#000"
                dy="8"
              >
                {phValue.toFixed(1)}
              </SvgText>
            </Svg>
          </View>
        </View>

        {/* Container 2 */}
        <View style={styles.container2}>
          {/* Left Section */}
          <View style={styles.leftSection2}>
            <Image source={turbidity} style={styles.icon} />
            <Text style={styles.containerTitle2}>TURBIDITY</Text>
          </View>
          {/* Right Section */}
          <View style={styles.rightSection2}>
            {/* Circular Gauge */}
            <Svg width="100" height="100">
              {/* Background Circle */}
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E1E1E1"
                strokeWidth="10"
                fill="transparent"
              />
              {/* turbidity Value Circle */}
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#7EA3CC"
                strokeWidth="10"
                strokeDasharray={`${(turbValue / 5) * 282.5} 565`}
                strokeLinecap="butt"
                fill="transparent"
              />
              {/* Text Displaying turbidity Value */}
              <SvgText
                x="50%"
                y="50%"
                fontSize="16"
                textAnchor="middle"
                fill="#000"
                dy="8"
              >
                {turbValue.toFixed(1)}
              </SvgText>
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: "0%",
  },
  frame: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  accent: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#255C99",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  dateGreetingsContainer: {
    alignItems: "flex-start",
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30,
  },
  date: {
    color: "white",
    fontSize: 12,
  },
  greetings: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sidebarIconContainer: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  sidebarIcon: {
    width: 30,
    height: 30,
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarLogo: {
    width: 100,
    height: 120, 
  },
  sidebarItems: {
    flex: 1,
    justifyContent: 'center',
  },
  sidebarItem: {
    marginBottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderBottomWidth: 2,
    borderColor: "#A0A0A0",
    flexDirection: 'row', 
  },
  sidebarItemText: {
    fontSize: 16,
  },
  sbicon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  sidebarExit: {
    marginTop: 10,
  },
  logoImageContainer: {
    alignItems: 'center',
    bottom: 0,
    paddingTop: 20,
  },
  logoImage: {
    width: 40,
    height: 55,
  },
  alertIconContainer: {
    alignItems: "flex-start",
    bottom: "81%",
    left: "2%",
  },
  alertIcon: {
    width: 30,
    height: 30,
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "15%",
    bottom: "5%",
    left: "7%",
    right: "7%",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    color: "white",
  },
  container1: {
    flexDirection: "row",
    backgroundColor: "#7EA3CC",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 30,
  },
  leftSection1: {
    flexDirection: "column",
    alignItems: "center",
  },
  rightSection1: {
    backgroundColor: "#F0f0f0",
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 35,
    paddingRight: 35,
    left: 20,
    alignItems: "center",
  },
  pHValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#85A0AF",
    marginTop: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 30,
    marginBottom: 20,
    right: 20,
  },
  containerTitle1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    right: 20,
  },
  container2: {
    flexDirection: "row",
    backgroundColor: "#7EA3CC",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    marginTop: 10,
    borderRadius: 30,
  },
  leftSection2: {
    flexDirection: "column",
    alignItems: "center",
  },
  rightSection2: {
    backgroundColor: "#F0f0f0",
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 35,
    paddingRight: 35,
  },
  containerTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    right: 20,
  },
});

export default HomeScreen;
