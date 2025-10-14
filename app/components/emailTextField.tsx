import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface emailTextField {
  value: string
  onChangeText: (text : string) => void;
  error?:boolean
}

export default function emailTextField(
{
  value,
  onChangeText, 
  error = false
}: emailTextField) {
  return (
    <View>
      <TextInput
        className={`text-base w-full px-8 py-5 bg-[#FAF7F0] rounded-3xl ${
          error ? "border border-red-500" : ""
        }`}
        placeholder="Email Address"
        placeholderTextColor={error ? "#ef4444" : ""}
        keyboardType="email-address"
        value={value}
        onChangeText={(text) => onChangeText(text.trim().toLowerCase())}
      />
      {error && <Text className="text-red-500 text-sm ml-2">Email is required</Text>}
    </View>
  )
}