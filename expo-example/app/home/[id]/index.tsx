import { faker } from "@faker-js/faker";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Alert, Text, View } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Book from "../../../types/Book";
import Pet from "../../../types/Pet"

export default function PetDetails() {
  const { id } = useGlobalSearchParams();

  // for convenience, you can extract data and rename it to "book" by typing data:your_alias_for_data
  const {
    data: pet,
    loading,
    upsert,
  } = useDocument<Pet>("pets", id as string);

  // important: always check for loading state since firestore is async!
  // Also, you can check for existence of book object so your type Book | undefined becomes a Book for sure
  if (loading || !pet) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Pet",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Detalhes</Text>

      <Text>id: {id}</Text>
      <Text>Name: {pet.name}</Text>
      <Text>Type: {pet.type}</Text>
      <Text>Age: {pet.age}</Text>

      <StyledButton
        title="Random Update"
        onPress={async () => {
          try {
            await upsert({
              ...pet, // repeating the existing book object
              name: faker.name.firstName(), // updating title 
              type: faker.animal.type(),
              age: faker.datatype.number({ max: 20 })
            });
          } catch (error: any) {
            Alert.alert("Update Pet error", error.toString());
          }
        }}
      />
    </View>
  );
}
