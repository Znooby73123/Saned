import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  I18nManager,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Define props type
type ChallengesScreenProps = {
  onBack: () => void;
};

const ChallengesScreen = ({ onBack }: ChallengesScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>التحديات</Text>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/profile_image.png")} // Replace with your actual profile image path
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>استكشف واختبر مدى فهمك</Text>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.largeCard}>
            <Text style={styles.largeCardText}>انقر هنا للبدء!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Image
              source={require("@/assets/images/daily_challenges.png")} // Replace with your actual image path
              style={styles.smallCardImage}
              resizeMode="contain"
            />
            <Text style={styles.smallCardTitle}>
              الإختبارات والتحديات اليومية!
            </Text>
            <Text style={styles.smallCardSubtitle}>05 Questions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Image
              source={require("@/assets/images/practice_questions.png")} // Replace with your actual image path
              style={styles.smallCardImage}
              resizeMode="contain"
            />
            <Text style={styles.smallCardTitle}>أسئلة تدريبية</Text>
            <Text style={styles.smallCardSubtitle}>200 Questions</Text>
            <Text style={styles.smallCardSubtitle}>29 Topic sheets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>إختبارات تجريبية</Text>
            <Text style={styles.smallCardSubtitle}>100 Questions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    // padding: 20,
    // marginTop: 3,
    // paddingTop: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 30,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 20,
  },
  largeCard: {
    backgroundColor: "#E6F9F2",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  largeCardImage: {
    width: "80%",
    height: 150,
    marginBottom: 15,
  },
  largeCardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
  },
  smallCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  smallCardImage: {
    width: "100%",
    height: 80,
    marginBottom: 10,
  },
  smallCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  smallCardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
});

export default ChallengesScreen;
