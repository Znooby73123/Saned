import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface CourseItemProps {
  title: string;
  time: string;
  location: string;
  onDelete: () => void;
}

const CourseItem: React.FC<CourseItemProps> = ({
  title,
  time,
  location,
  onDelete,
}) => {
  return (
    <View style={styles.courseItem}>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Feather name="trash-2" size={20} color="#D32F2F" />
        </TouchableOpacity>
      </View>
      <Text style={styles.courseTitle}>{title}</Text>
      <Text style={styles.courseTime}>{time}</Text>
      <View style={styles.locationContainer}>
        <Feather
          name="map-pin"
          size={16}
          color="#777"
          style={styles.locationIcon}
        />
        <Text style={styles.courseLocation}>{location}</Text>
      </View>
    </View>
  );
};

// Define props type
type CoursesScreenProps = {
  onBack: () => void;
};

// Optional: force RTL if needed for Arabic layout
if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

const CoursesScreen = ({ onBack }: CoursesScreenProps) => {
  const [courses, setCourses] = useState([
    {
      title: "مقرر الشبكات",
      time: "11:30 AM - 12:30 PM",
      location: "المبنى الجديد F40",
      id: "1",
    },
    {
      title: "مقرر نظم المعلومات",
      time: "11:30 AM - 12:30 PM",
      location: "المبنى الجديد F40",
      id: "2",
    },
    {
      title: "مقرر نظم التشغيل",
      time: "11:30 AM - 12:30 PM",
      location: "المبنى الجديد F40",
      id: "3",
    },
    {
      title: "مقرر برمجة OOP1",
      time: "11:30 AM - 12:30 PM",
      location: "المبنى الجديد F40",
      id: "4",
    },
  ]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseTime, setNewCourseTime] = useState("");
  const [newCourseLocation, setNewCourseLocation] = useState("");

  const handleAddCourse = () => {
    if (newCourseTitle && newCourseTime && newCourseLocation) {
      const newCourse = {
        id: Date.now().toString(),
        title: newCourseTitle,
        time: newCourseTime,
        location: newCourseLocation,
      };
      setCourses([...courses, newCourse]);
      setNewCourseTitle("");
      setNewCourseTime("");
      setNewCourseLocation("");
      setAddModalVisible(false);
    } else {
      // Optionally show an error message
      alert("Please fill in all course details.");
    }
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>مقرراتي</Text>
          <View style={styles.profileContainer}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitial}>نورة</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          {/* Course List */}
          <View style={styles.courseList}>
            {courses.map((course) => (
              <CourseItem
                key={course.id}
                title={course.title}
                time={course.time}
                location={course.location}
                onDelete={() => handleDeleteCourse(course.id)}
              />
            ))}
          </View>
        </ScrollView>
        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Add Course Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddModalVisible}
          onRequestClose={() => {
            setAddModalVisible(!isAddModalVisible);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>إضافة مقرر جديد</Text>
              <TextInput
                style={styles.input}
                placeholder="اسم المقرر"
                textAlign="right"
                value={newCourseTitle}
                onChangeText={setNewCourseTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="الوقت (مثال: 10:00 AM - 11:00 AM)"
                textAlign="right"
                value={newCourseTime}
                onChangeText={setNewCourseTime}
              />
              <TextInput
                style={styles.input}
                placeholder="الموقع"
                textAlign="right"
                value={newCourseLocation}
                onChangeText={setNewCourseLocation}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setAddModalVisible(!isAddModalVisible)}
                >
                  <Text style={styles.textStyle}>إلغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonAdd]}
                  onPress={handleAddCourse}
                >
                  <Text style={styles.textStyle}>إضافة</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImagePlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFCDD2",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#D32F2F",
    fontWeight: "bold",
    fontSize: 16,
  },
  courseList: {
    paddingTop: 16,
  },
  courseItem: {
    backgroundColor: "#FFFBE7",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#FFC107",
    flexDirection: "column-reverse", // For RTL delete button position
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "right",
    writingDirection: "rtl",
  },
  courseTime: {
    color: "#777",
    marginBottom: 4,
    textAlign: "right",
    writingDirection: "rtl",
  },
  locationContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  locationIcon: {
    marginLeft: 4,
  },
  courseLocation: {
    color: "#777",
    textAlign: "right",
    writingDirection: "rtl",
  },
  addButton: {
    position: "absolute",
    bottom: 20, // Adjusted bottom position
    left: 20,
    backgroundColor: "#FFC107",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    textAlign: "right",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "40%",
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#D32F2F",
  },
  buttonAdd: {
    backgroundColor: "#4CAF50",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    padding: 5,
  },
});

export default CoursesScreen;
