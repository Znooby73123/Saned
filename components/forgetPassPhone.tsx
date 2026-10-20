import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ForgetPassPhone2 from "@/components/forgetPassPhone2";

I18nManager.forceRTL(true);

type PhoneVerificationScreenProps = {
  onBack: () => void;
};

const PhoneVerificationScreen = ({ onBack }: PhoneVerificationScreenProps) => {
  const [showForgetPassPhone2, setShowForgetPassPhone2] = useState(false);

  if (showForgetPassPhone2) {
    return <ForgetPassPhone2 onBack={() => setShowForgetPassPhone2(false)} />;
  }
  return (
    <View style={styles.container}>
      {/* 🔙 Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>نسيت كلمة المرور</Text>

      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>💬</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.cardTitle}>تحقق من هاتفك</Text>
          <Text style={styles.cardSub}>
            لقد أرسلنا رمز التحقق إلى الرقم المنتهي بـ 3665
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowForgetPassPhone2(true)}
      >
        <Text style={styles.buttonText}>استمرار</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 85,
    left: 16,
    zIndex: 1,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    top: 50,
    marginBottom: 200,
  },
  card: {
    backgroundColor: "#FFF6E0",
    borderRadius: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 20,
    marginBottom: 200,
  },
  iconWrapper: {
    backgroundColor: "#FFD365",
    borderRadius: 360,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  icon: {
    fontSize: 22,
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 5,
  },
  cardSub: {
    fontSize: 14,
    textAlign: "right",
    color: "#666",
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

export default PhoneVerificationScreen;
