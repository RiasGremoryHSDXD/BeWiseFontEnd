import React from "react";
import { FlatList, Image, Text, View } from "react-native";

interface HistoryItem {
  _id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface HistoryListProps {
  data: HistoryItem[];
  color?: "green" | "red";
  icon: any; 
}

export default function HistoryList({
  data,
  color = "green",
  icon,
}: HistoryListProps) {
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const textColor =
    color === "red" ? "text-red-600" : "text-green-600";

  if (!data || data.length === 0) {
    return (
      <View className="items-center justify-center py-10">
        <Text className="text-gray-500 italic">No records found</Text>
      </View>
    );
  }

  return (
    <View className="w-full">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-3xl h-20 p-4 w-full">
            <View className="flex-row items-center justify-between h-full">
              {/* Left Icon */}
              <View className="justify-center items-center">
                <Image
                  source={icon}
                  style={{ width: 32, height: 32 }}
                  resizeMode="contain"
                />
              </View>

              {/* Middle Content */}
              <View className="px-3 justify-center items-center">
                <Text className="text-lg font-semibold text-gray-800 mb-1">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500 capitalize">
                  {item.category}
                </Text>
              </View>

              {/* Right Side */}
              <View className="items-end justify-between">
                <Text className={`text-lg font-bold ${textColor} mb-1`}>
                  ₱{formatAmount(item.amount)}
                </Text>
                <View className="flex-row rounded-full px-2 gap-4 py-1 shadow-sm">
                  <Text>{item.date}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
