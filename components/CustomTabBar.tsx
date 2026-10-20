import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NavigationContainerRef } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RouteProp } from "@react-navigation/native";

const tabConfig = [
  { name: "list", icon: "menu-outline", label: "القائمة" },
  { name: "tasks", icon: "calendar-outline", label: "مهامي" },
  { name: "home", icon: "home", label: "" }, // center
  { name: "contact", icon: "chatbubble-outline", label: "تواصل معنا" },
  { name: "profile", icon: "person-outline", label: "حسابي" },
];

// Define the possible route names for your bottom tab navigator
type BottomTabParamList = {
  list: undefined;
  schedule: undefined;
  home: undefined;
  contact: undefined;
  profile: undefined;
};

interface CustomTabBarProps extends BottomTabBarProps {
  navigation: NavigationContainerRef<BottomTabParamList> | any; // Now with the type argument
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      {tabConfig.map((tab, index) => {
        const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
        const isFocused = state.index === routeIndex;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: state.routes[routeIndex]?.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        const iconColor = isFocused ? "#FF914D" : "#555";

        // Center Home button
        if (tab.name === "home") {
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              style={styles.centerButton}
            >
              <Icon name={tab.icon} size={28} color="#fff" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Icon name={tab.icon} size={22} color={iconColor} />
            <Text style={[styles.tabLabel, { color: iconColor }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row", // <- LTR direction
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 70,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: 10,
    justifyContent: "space-evenly", // Align items evenly
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  centerButton: {
    backgroundColor: "#FF914D",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30, // Adjust this if necessary
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
});
