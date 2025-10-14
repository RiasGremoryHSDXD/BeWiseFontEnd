import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

type ExpensesCategory = "Insurance" | "Bills" | "Game" | "Grocery" | "Other";

interface PickerCategoryProps {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  type: "income" | "expenses";
}

export default function PickerCategory({
  label = "Category",
  selectedValue,
  onValueChange,
  type,
}: PickerCategoryProps) {
  const categoryOptions =
    type === "income"
      ? [
          { label: "Work", value: "Work" },
          { label: "Investment", value: "Investment" },
          { label: "Savings", value: "Savings" },
          { label: "Side Hustle", value: "Side Hustle" },
          { label: "Other", value: "Other" },
        ]
      : [
          { label: "Insurance", value: "Insurance" },
          { label: "Bills", value: "Bills" },
          { label: "Game", value: "Game" },
          { label: "Grocery", value: "Grocery" },
          { label: "Other", value: "Other" },
        ];

  return (
    <View className="w-full mt-2">
      <Text className="font-semibold">{label}</Text>
      <View className="border border-black rounded-lg overflow-hidden mt-1">
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {categoryOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
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