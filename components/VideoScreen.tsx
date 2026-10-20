import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  I18nManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VideoDetailsScreen from "@/components/VideoDetailsScreen";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

interface VideoItem {
  id: string;
  image: any; // Be more specific if possible, e.g., number for static assets
  title: string;
  author: string;
}

const videos: VideoItem[] = [
  {
    id: "1",
    image: require("@/assets/images/db.png"),
    title: "أساسيات قواعد البيانات",
    author: "محمد السويح",
  },
  {
    id: "2",
    image: require("@/assets/images/purple.png"),
    title: "شروحات الرياضيات",
    author: "Neso Academy",
  },
  {
    id: "3",
    image: require("@/assets/images/math.png"),
    title: "أساسيات الخوارزميات",
    author: "Neso Academy",
  },
  {
    id: "4",
    image: require("@/assets/images/ai.png"),
    title: "شرح نظرية اللغات",
    author: "إسلام همام",
  },
];

interface VideosScreenProps {
  onBack: () => void;
}

export default function VideosScreen({ onBack }: VideosScreenProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  if (selectedVideo) {
    return (
      <VideoDetailsScreen
        image={selectedVideo.image}
        title={selectedVideo.title}
        onBack={() => setSelectedVideo(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* AppBar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>الفيديوهات التعليمية</Text>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/profile_image.png")} // Replace with your actual profile image path
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Header */}
        {/*<View style={styles.titleRow}>*/}
        {/*  <Ionicons name="chevron-back" size={26} color="#000" />*/}
        {/*  <Text style={styles.appBarTitle}>الفيديوهات التعليمية</Text>*/}
        {/*</View>*/}

        <Text style={styles.subTitle}>جمعنا لكم أفضل الشروحات</Text>

        {/* Video List */}
        <FlatList
          data={videos}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 140, paddingTop: 50 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedVideo(item)}>
              <View style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardAuthor}>{item.author}</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={16}
                      color="#FFA500"
                    />
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  header: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    // padding: 20,
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
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 3,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  bellIcon: {
    width: 28,
    height: 28,
    marginLeft: 15,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 22.5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 4,
  },
  subTitle: {
    textAlign: "center",
    color: "#808080",
    marginBottom: 25,
    fontSize: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    width: width / 2.3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 13,
    color: "#808080",
  },
  stars: {
    flexDirection: "row",
    marginTop: 5,
  },
});
