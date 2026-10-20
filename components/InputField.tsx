// @/components/InputField.tsx
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  I18nManager,
} from "react-native";

// @ts-ignore
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  const isRTL = I18nManager.isRTL;
  const textAlign = isRTL ? "right" : "left";
  const iconMargin = isRTL ? { marginLeft: 8 } : { marginRight: 8 };
  const contentDirection = isRTL ? "row-reverse" : "row";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`text-lg font-JakartaSemiBold mb-1 ${labelStyle}`}
            style={[{ textAlign }, styles.label]}
          >
            {label}
          </Text>

          <View
            className={`flex flex-row items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
            style={{ flexDirection: contentDirection }}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-6 h-6 ${iconStyle}`}
                style={iconMargin}
              />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              style={{ textAlign }}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  label: {
    // fallback styling
  },
});

export default InputField;
