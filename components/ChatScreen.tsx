import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  I18nManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ChatScreenProps = {
  onBack: () => void;
};

// Force RTL layout if it's not already enabled
if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

const ChatScreen = ({ onBack }: ChatScreenProps) => {
  const [messages, setMessages] = useState([
    { id: "1", text: "أهلًا!", fromUser: false },
    { id: "2", text: "أهلًا بك", fromUser: true },
    { id: "3", text: "كيف يمكنني مساعدتك؟", fromUser: false },
  ]);

  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text, fromUser: true },
      ]);
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.fromUser ? styles.fromUser : styles.fromSupport,
            ]}
          >
            {!item.fromUser && (
              <Image
                source={require("@/assets/images/memoji2.png")}
                style={styles.avatar}
              />
            )}
            <View
              style={[
                styles.bubble,
                item.fromUser ? styles.userBubble : styles.supportBubble,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="اكتب رسالتك"
          placeholderTextColor="#aaa"
          textAlign="right"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>إرسال</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },

  backButton: {
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 10,
  },

  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },

  fromUser: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },

  fromSupport: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },

  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: "75%",
  },

  userBubble: {
    backgroundColor: "#d1f7c4",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 0,
  },

  supportBubble: {
    backgroundColor: "#e6f2ff",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 0,
  },

  messageText: {
    fontSize: 16,
    textAlign: "right",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    textAlign: "right",
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#f29a38",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  sendText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatScreen;
