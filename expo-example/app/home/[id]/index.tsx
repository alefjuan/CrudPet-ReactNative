import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';

import HeaderRight from '../../../components/HeaderRight';
import Loading from '../../../components/Loading';
import StyledButton from '../../../components/StyledButton';
import useDocument from '../../../firebase/hooks/useDocument';
import globalStyles from '../../../styles/globalStyles';
import Pet from '../../../types/Pet';
import AddPetModal from '../../../components/AddPetModal';

export default function PetDetails() {
  const { id } = useGlobalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: pet,
    loading,
    upsert,
  } = useDocument<Pet>('pets', id as string);

  if (loading || !pet) return <Loading />;

  const handleUpdatePet = async (updatedPet: { name: string; type: string; age: number }) => {
    try {
      await upsert({ ...pet, ...updatedPet });
      setModalVisible(false);
    } catch (error: any) {
      Alert.alert('Update Pet error', error.toString());
    }
  };

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: 'Pet',
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Detalhes</Text>

      <Text>id: {id}</Text>
      <Text>Name: {pet.name}</Text>
      <Text>Type: {pet.type}</Text>
      <Text>Age: {pet.age}</Text>

      <StyledButton
        title="Edit Pet"
        onPress={() => setModalVisible(true)}
      />

      <AddPetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddPet={handleUpdatePet}
        initialPet={{ name: pet.name, type: pet.type, age: pet.age }}
      />
    </View>
  );
}
