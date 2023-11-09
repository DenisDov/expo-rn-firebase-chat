import { useAuth } from "@app/context/auth";
import { Box, Text } from "@app/theme";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { SignInScreenProps } from "@app/navigation/types";
import Ionicons from "@expo/vector-icons/Ionicons";

export const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [email, setEmail] = useState("xsyndromex@gmail.com");
  const [password, setPassword] = useState("kT431!");

  const { loading, signIn } = useAuth();

  return (
    <Box flex={1} padding="m">
      <Box gap="m">
        <Text>ENVIRONMENT: {process.env.NODE_ENV}</Text>
        <TouchableOpacity onPress={() => signIn(email, password)}>
          <Text>LOGIN WITH EMAIL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text>REGISTER WITH EMAIL</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="tomato" />}
      </Box>
    </Box>
  );
};
