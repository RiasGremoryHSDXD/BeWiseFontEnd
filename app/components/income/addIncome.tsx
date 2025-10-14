import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import LoadingScreen from "../Loading";
import PickerCategory from "../pickerCategory";

type IncomeCategory =
  | "Work"
  | "Investment"
  | "Savings"
  | "Side Hustle"
  | "Other";
type Frequency = "OneTime" | "Monthly";
type Props = {
  onClose: () => void;
};


export default function addIncome({onClose} : Props) {
  const [userCredentialsID, setUserCredentialsID] =
    useState<Id<"userCredentials"> | null>(null);
  const [incomeName, setIncomeName] = useState<string>("");
  const [incomeCategoryValue, setIncomeCategoryValue] =
    useState<IncomeCategory>("Other");
  const [amount, setAmount] = useState<number>(0);
  const [expectedPayOut, setExpectedPayOut] = useState<Date>(new Date());
  const [frequency, setFrequency] = useState<Frequency>("OneTime");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation();

  // const insertNewIncomeRow = useMutation(api.functions.income.insertNewIncome.insertNewIncome);
  const insertNewIncomeRow = useMutation(
    api.functions.income.insertNewIncome.insertNewIncome
  );

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserCredentialsID(user.id || "");
        }
      } catch (e) {
        Alert.alert(
          "Error local storage",
          "Error in retrieve Data in local Storage"
        );
      }
    };

    loadUserInfo();
  }, []);

  const handleNewIncomeRecord = async () => {
    if (loading || isProcessing) return;
    setIsProcessing(true);

    try {
      if (!userCredentialsID || !incomeName || !amount || !expectedPayOut) {
        Alert.alert("Missing data", "Please fill out all fields.");
        return;
      }

      setLoading(true);

      await insertNewIncomeRow({
        userCredentialsID,
        incomeName,
        incomeCategory: incomeCategoryValue,
        amount,
        expectedPayOut: expectedPayOut.toISOString(),
        frequency,
      });

      setLoading(false);

      Alert.alert("Success", "Income record added successfully!");
    } catch (e) {
      Alert.alert("Error", "Failed to insert income record.");
      console.error(e);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <View className="flex gap-y-3 w-full">
      {/*Income Name View*/}
      <View className="flex flex-col gap-y-3">
        <Text className="font-semibold">Income Details:</Text>

        {/* Income Name */}
        <TextInput
          className="border rounded-md py-5 px-3"
          placeholder="Income name"
          value={incomeName}
          onChangeText={(text) => setIncomeName(text)}
        ></TextInput>

        {/* Amount */}
        <TextInput
          className="border rounded-md py-5 px-3"
          placeholder="Amount"
          value={amount === 0 ? "" : amount.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setAmount(0);
            } else {
              const num = parseFloat(text);
              setAmount(isNaN(num) ? 0 : num);
            }
          }}
          keyboardType="numeric"
        ></TextInput>
      </View>

      {/*Income Category View*/}
      <PickerCategory 
        type="income"
        selectedValue={incomeCategoryValue}
        onValueChange={(itemValue) => setIncomeCategoryValue(itemValue as IncomeCategory)}
      />

      {/* Frequency */}
      <Text className="font-semibold mt-2">Frequency</Text>
      <View className="border border-black rounded-lg overflow-hidden">
        <Picker
          selectedValue={frequency}
          onValueChange={(itemValue) => setFrequency(itemValue)}
        >
          <Picker.Item label="OneTime" value="OneTime" />
          <Picker.Item label="Monthly" value="Monthly" />
        </Picker>
      </View>

      {/* expectedPayOut */}
      <View className="flex flex-row justify-between">
        {frequency === "OneTime" ? (
          <Text>Expected Payout : </Text>
        ) : (
          <Text>Started Monthly Payout : </Text>
        )}

        {expectedPayOut && (
          <TouchableOpacity
            className="border border-gray-300 rounded-md px-3 bg-gray-50"
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{expectedPayOut.toDateString()}</Text>
          </TouchableOpacity>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={expectedPayOut || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setExpectedPayOut(selectedDate);
            }}
          />
        )}
      </View>

      <View className="flex flex-row justify-between mt-5 w-full">
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1 p-3 bg-green-400 rounded-lg items-center mr-2"
          onPress={handleNewIncomeRecord}
          disabled={loading || isProcessing}
        >
          <Text className="text-xl font-semibold text-white">Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          className="flex-1 p-3 bg-gray-400 rounded-lg items-center ml-2"
          onPress={onClose}
        >
          <Text className="text-xl font-semibold text-white">Close</Text>
        </TouchableOpacity>
      </View>

      {loading && <LoadingScreen />}
    </View>
  );
}
