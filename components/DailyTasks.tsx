import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  I18nManager,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

type DailyTasksScreenProps = {
  onBack: () => void;
};

// Ensure RTL is forced for Arabic layout
if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

const DailyTasksScreen = ({ onBack }: DailyTasksScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>مهامي اليومية</Text>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/profile_image.png")} // Replace with your actual profile image path
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/*<Text style={styles.header}></Text>*/}

        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>مذاكرة مادة الشبكات</Text>
          <Text style={styles.taskStatus}>قيد الإنجاز</Text>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>حل واجب نظم المعلومات</Text>
          <Text style={styles.taskStatus}>مكتمل ✅</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    // paddingTop: 20,
  },
  backButton: {
    padding: 20,
    // paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  taskCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginTop: 20,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
    writingDirection: "rtl",
  },
  taskStatus: {
    marginTop: 8,
    textAlign: "right",
    color: "#6B7280",
    writingDirection: "rtl",
  },
});

export default DailyTasksScreen;
