import { api } from "@/convex/_generated/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmailTextField from "./components/emailTextField";
import PasswordTextField from "./components/passwordTextField";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logInError, setLogInError] = useState<boolean>(false);
  const [errorFields, setErrorFields] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const logInCredentialsValidation = useQuery(
    api.functions.credentials.logInUser.logInUser,
    { email, password }
  );

  const handleSignIn = async () => {
    // Reset error states
    const newErrorFields = {
      email: !email,
      password: !password,
    };

    setErrorFields(newErrorFields);

    if (!email || !password) return;

    setLoading(true);

    if (logInCredentialsValidation === undefined) {
      setLoading(false);
      return;
    }

    if (!logInCredentialsValidation.success) {
      setLogInError(true);
      setLoading(false);
      return;
    }

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          id: logInCredentialsValidation.user?.id,
          email: logInCredentialsValidation.user?.email,
          username: logInCredentialsValidation.user?.username,
        })
      );

      router.replace("/tabs/home");
    } catch (error) {
      console.log("Error saving user: ", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (field: string) => {
    if (errorFields[field as keyof typeof errorFields]) {
      setErrorFields((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  return (
    <>
      <View className="flex gap-3">
        <View>
          <EmailTextField
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              clearFieldError("email")
            }}
            error={errorFields.email}
          />
        </View>

        <View className="w-full">
          <PasswordTextField
            value={password}
            onChangeText={(text) => {
              setPassword(text)
              clearFieldError("password")
            }}
            error={errorFields.password}
          />
        </View>

        <View className="flex items-end">
          <Text>Forgot password?</Text>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          className="bg-[#36978C] flex items-center w-1/2 py-4 self-center rounded-[100px]"
          onPress={handleSignIn}
        >
          <Text className="text-2xl text-black font-medium">Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Login Error Modal */}
      <Modal
        visible={logInError}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogInError(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-3xl p-8 mx-6 w-80 shadow-2xl">
            {/* Error Icon */}
            <View className="items-center mb-4">
              <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
                <Text className="text-red-600 text-4xl">✕</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                Login Failed!
              </Text>
              <Text className="text-gray-600 text-center text-base leading-6">
                Invalid email or password. Please check your credentials and try
                again.
              </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              activeOpacity={1}
              className="bg-[#36978C] py-3 px-6 rounded-2xl mt-6"
              onPress={() => setLogInError(false)}
            >
              <Text className="text-white text-lg font-semibold text-center">
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading Overlay */}
      {loading && (
        <View className="absolute inset-0 flex  items-center">
          <ActivityIndicator size={100} color="#36978C" />
        </View>
      )}
    </>
  );
}
