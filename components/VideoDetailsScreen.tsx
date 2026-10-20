import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface VideoDetailsScreenProps {
  image: any; // You might want to be more specific with the image type
  title: string;
  onBack: () => void;
}

export default function VideoDetailsScreen({
  image,
  title,
  onBack,
}: VideoDetailsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <Image source={image} style={styles.videoImage} />

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>شرح {title}</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="video-library" size={20} color="#FF7A00" />
            <Text style={styles.infoText}>اكثر من 100 فيديو تعليمي</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color="#FF7A00" />
            <Text style={styles.infoText}>يمكنك إنهاء الدروس في 7 اسابيع</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="event-available" size={20} color="#FF7A00" />
            <Text style={styles.infoText}>يوجد شهادة حضور</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FB",
  },
  backButton: {
    marginTop: 25,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  videoImage: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 15,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    textAlign: "right",
    flex: 1,
    marginRight: 5,
  },
});
