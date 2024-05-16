import { faker } from "@faker-js/faker";
import { Stack } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewBook from "../../components/ViewBook";
import ViewPet from "../../components/ViewPet";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Book from "../../types/Book";
import Pet from "../../types/Pet"

export default function Home() {
  const { data, create, remove, refreshData, loading } =
    useCollection<Pet>("pets");

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Collection",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Pets Collection</Text>

      <StyledButton 
        title="+New Pet"
        onPress={async () => {
          try {
            await create({
              name: faker.name.firstName(),
              type: faker.animal.type(),
              age: faker.datatype.number({ max: 20 }),
            });

            await refreshData();
          } catch (error: any) {
            Alert.alert("Create Pet error", error.toString());
          }
        }}
        style={{ width: "100%", backgroundColor:"green"}}/>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewPet
              pet={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}
