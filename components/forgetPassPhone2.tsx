import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

// Force RTL layout
I18nManager.forceRTL(true);

interface VerificationCodeScreenProps {
  onBack: () => void; // Define the type for the onBack prop as a function
}

export default function VerificationCodeScreen({
  onBack,
}: VerificationCodeScreenProps) {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]); // Typing the ref to hold an array of TextInput or null

  const handleChange = (text: string, index: number) => {
    // Typing text as string and index as number
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>أدخل رمز التحقق</Text>
      <Text style={styles.subtitle}>
        الرجاء إدخال رمز التحقق المرسل إلى رقم هاتفك
      </Text>

      <View style={styles.codeInputRow}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(ref) => (inputs.current[index] = ref)} // Typing ref
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        لم يصلك الرمز؟ <Text style={styles.timer}>00:59</Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/(root)/(tabs)/home");
        }}
      >
        <Text style={styles.buttonText}>استمرار</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    top: 50,
    right: 25, // Changed from left to right for RTL
    zIndex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    top: 30,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 50,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "right",
    color: "#666",
    marginBottom: 40,
  },
  codeInputRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 90,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    width: 60,
    height: 60,
    textAlign: "center",
    fontSize: 20,
  },
  resendText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 200,
  },
  timer: {
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FDB827",
    padding: 16,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
