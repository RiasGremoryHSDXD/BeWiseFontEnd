// FrequencyPicker.tsx
import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

type FrequencyPickerProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function FrequencyPicker({
  label = "Frequency",
  value,
  onChange,
}: FrequencyPickerProps) {
  return (
    <View className="mt-2">
      <Text className="font-semibold">{label}</Text>
      <View className="border border-black rounded-lg overflow-hidden">
        <Picker selectedValue={value} onValueChange={onChange}>
          <Picker.Item label="OneTime" value="OneTime" />
          <Picker.Item label="Monthly" value="Monthly" />
        </Picker>
      </View>
    </View>
  );
}

/**
 * list of file that uses this file
 * 
 * addExpenses.tsx
 * updateExpenses.tsx
 * addIncome.tsx
 * updateIncome.tsx
 */