import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Calendar, DateData } from "react-native-calendars";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView

const { height } = Dimensions.get("window");

// Define the structure of an event
interface Event {
  title: string;
  room: string;
  color: string;
}

// Mock events by date with explicit typing
const eventsData: { [date: string]: Event[] } = {
  "2020-06-04": [
    { title: "محاضرة تحليل عددي", room: "F33", color: "#4A90E2" },
    { title: "مناقشة مشروع الويب", room: "F40", color: "#FFB347" },
  ],
  "2020-06-05": [{ title: "مراجعة نهائية", room: "F20", color: "#9B59B6" }],
};

function ScheduleScreen() {
  const [selected, setSelected] = useState<string>("2020-06-04");
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationY } = event.nativeEvent;
    translateY.value = withSpring(translationY > 50 ? height * 0.35 : 0);
  };

  const todayEvents: Event[] = eventsData[selected] || [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F4F4F4", paddingHorizontal: 20 }} // Slightly lighter background
    >
      {/* Header */}
      <View style={styles.headerHome}>
        <TouchableOpacity style={styles.bellHome}>
          <Icon name="notifications-outline" size={22} color="#FF914D" />
        </TouchableOpacity>
        <View style={styles.userHome}>
          <Text style={{ fontWeight: "600" }}>نورة</Text>
          <View style={styles.avatarHome} />
        </View>
      </View>

      {/* Calendar */}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[animatedStyle, styles.calendarContainer]}>
          {/* Drag Hint */}
          <View style={styles.dragIndicator}>
            <Icon name="chevron-down-outline" size={20} color="#777" />{" "}
            {/* Darker hint color */}
          </View>

          <Calendar
            current={selected}
            onDayPress={(day: DateData) => setSelected(day.dateString)}
            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: "#FF914D",
                selectedTextColor: "#fff",
              }, // White text on selected day
            }}
            theme={{
              textSectionTitleColor: "#333", // Darker section titles
              selectedDayBackgroundColor: "#FF914D",
              selectedDayTextColor: "#fff",
              todayTextColor: "#FF914D",
              dayTextColor: "#444", // Darker day text
              textDisabledColor: "#ccc",
              calendarBackground: "#fff", // Explicit calendar background
              monthTextColor: "#333", // Darker month text
            }}
            style={styles.calendar}
          />
        </Animated.View>
      </PanGestureHandler>

      {/* Events */}
      <ScrollView style={{ marginTop: 20 }}>
        {todayEvents.map((event: Event, index: number) => (
          <View
            key={index}
            style={styles.eventBox} // Using a more generic name
          >
            <EventCard
              title={event.title}
              room={event.room}
              borderColor={event.color}
            />
          </View>
        ))}
      </ScrollView>

      {/* Bottom actions */}
      {/*<View style={styles.bottomActions}>*/}
      {/* <TouchableOpacity>*/}
      {/* <Icon name="calendar-outline" size={22} color="#777" />*/}
      {/* </TouchableOpacity>*/}
      {/* <TouchableOpacity style={styles.addButton}>*/}
      {/* <Icon name="add" size={28} color="#fff" />*/}
      {/* </TouchableOpacity>*/}
      {/* <TouchableOpacity>*/}
      {/* <Icon name="briefcase-outline" size={22} color="#777" />*/}
      {/* </TouchableOpacity>*/}
      {/*</View>*/}
    </ScrollView>
  );
}

interface EventCardProps {
  title: string;
  room: string;
  borderColor?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  room,
  borderColor = "#ccc",
}) => (
  <View style={[styles.eventCard, { borderColor }]}>
    <View style={[styles.eventIndicator, { backgroundColor: borderColor }]} />{" "}
    {/* Colored indicator */}
    <View style={styles.eventDetails}>
      <Text style={styles.eventTime}>11:30 AM - 12:30 PM</Text>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventRoom}>المبنى الجديد {room}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    paddingBottom: 15,
  },
  bellHome: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  userHome: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatarHome: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFC9D6",
    marginLeft: 10,
  },
  calendarContainer: {
    borderRadius: 16,
    elevation: 3,
    marginTop: 10,
    backgroundColor: "#fff", // Add background to the animated view
    overflow: "hidden", // Clip rounded corners
  },
  calendar: {
    borderRadius: 16,
  },
  eventBox: {
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    elevation: 2, // Subtle shadow for event boxes
  },
  eventCard: {
    flexDirection: "row", // Align indicator and details
    borderLeftWidth: 5,
    borderColor: "transparent", // Will be set by prop
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    elevation: 1,
    alignItems: "center",
  },
  eventIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  eventDetails: {
    flex: 1,
  },
  eventTime: {
    fontSize: 12,
    color: "#888",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },
  eventRoom: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: "#FF914D",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  dragIndicator: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScheduleScreen />
    </GestureHandlerRootView>
  );
}
