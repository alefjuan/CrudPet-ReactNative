import { useRouter } from "expo-router";
import { Alert, Text } from "react-native";

import useAuth from "../firebase/hooks/useAuth";
import StyledButton from "./StyledButton";

export default function HeaderRight() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      <Text>{"Hello, "+user?.email?.replace("@example.com", "")+"!"}</Text>
      <StyledButton
        onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error: any) {
            Alert.alert("Logout error", error.toString());
          }
        }}
        title={"Sair"}
        style={{ width: "auto", marginLeft: 12, backgroundColor:"red"}}
      />
    </>
  );
}
