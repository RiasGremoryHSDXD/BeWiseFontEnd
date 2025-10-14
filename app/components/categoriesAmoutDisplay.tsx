import React from "react";
import { View, Text } from "react-native";

interface Category {
  label: string;
  amount: number;
}

interface CategoriesAmountDisplayProps {
  title: string;
  categories: Category[];
  color?: "red" | "green";
}

export default function CategoriesAmountDisplay({
  title,
  categories,
  color = "green",
}: CategoriesAmountDisplayProps) {
  const amountColor =
    color === "red" ? "text-red-600" : "text-green-600";

  return (
    <View className="flex flex-row flex-wrap justify-between bg-[#FAF7F0] py-6 px-4 rounded-2xl">
      <View className="w-full mb-3">
        <Text className="text-base font-semibold">{title}</Text>
      </View>

      {categories.map((item, index) => (
        <View
          key={index}
          className="w-[46%] border border-black/10 py-1 px-2 justify-center items-center bg-[#F2ECEC] rounded-lg mb-3"
        >
          <Text className="text-sm font-medium">{item.label}</Text>
          <Text className={`text-sm font-medium ${amountColor}`}>
            ₱ {item.amount}
          </Text>
        </View>
      ))}
    </View>
  );
}
