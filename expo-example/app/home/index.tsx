import React, { useState, useCallback } from 'react';
import { Alert, FlatList, RefreshControl, Text, View } from 'react-native';
import { faker } from '@faker-js/faker';
import { Stack } from 'expo-router';

import HeaderRight from '../../components/HeaderRight';
import Loading from '../../components/Loading';
import StyledButton from '../../components/StyledButton';
import ViewPet from '../../components/ViewPet';
import useCollection from '../../firebase/hooks/useCollection';
import globalStyles from '../../styles/globalStyles';
import Pet from '../../types/Pet';
import AddPetModal from '../../components/AddPetModal'; // Certifique-se de ajustar o caminho

export default function Home() {
  const { data, create, remove, refreshData, loading } = useCollection<Pet>('pets');
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleAddPet = async (newPet: { name: string; type: string; age: number }) => {
    try {
      await create(newPet);
      await refreshData();
      setModalVisible(false);
    } catch (error: any) {
      Alert.alert('Create Pet error', error.toString());
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshData();
    } catch (error: any) {
      Alert.alert('Refresh error', error.toString());
    } finally {
      setRefreshing(false);
    }
  }, [refreshData]);

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: 'Collection',
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Pets Collection</Text>

      <StyledButton
        title="+New Pet"
        onPress={() => setModalVisible(true)}
        style={{ width: '100%', backgroundColor: 'green' }}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <ViewPet
              pet={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: '100%' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <AddPetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddPet={handleAddPet}
      />
    </View>
  );
}
