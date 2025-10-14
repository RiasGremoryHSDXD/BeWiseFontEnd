import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";

interface PasswordTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
}

export default function PasswordTextField({
  value,
  onChangeText,
  error = false,
}: PasswordTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <View className="w-full">
      <View
        className={`flex flex-row items-center w-full px-4 py-2 rounded-3xl bg-[#FAF7F0] ${
          error ? "border border-red-500" : ""
        }`}
      >
        <TextInput
          className="flex-1 text-base px-2 py-3"
          placeholder="Password"
          placeholderTextColor={error ? "#ef4444" : ""}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity
         activeOpacity={1}
         onPress={togglePassword}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={25}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {error && (
        <Text className="text-red-500 text-sm ml-2 mt-1">
          Password is required
        </Text>
      )}
    </View>
  );
}
