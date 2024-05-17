import { useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';

import Pet from '../types/Pet';
import StyledButton from './StyledButton';

interface ViewBookProps {
  pet: Pet;
  onDelete: Function;
}

export default function ViewBook({ pet, onDelete }: ViewBookProps) {
  const router = useRouter();

  return (
    <View
      style={{ borderTopColor: 'darkblue', borderTopWidth: 1, marginTop: 12 }}
    >
      <Text>id: {pet.id}</Text>
      <Text>Name: {pet.name}</Text>
      <Text>Type: {pet.type}</Text>
      <Text>Age: {pet.age}</Text>

      <View style={{ flexDirection: 'row' }}>
        <StyledButton
          title="View Pet Details"
          onPress={() => {
            if (pet.id) {
              router.push(`/home/${pet.id}/`);
            } else {
              Alert.alert('View error', 'Necessita um id!');
            }
          }}
          style={{ width: '50%' }}
        />

        <StyledButton
          title="Delete"
          onPress={() => {
            if (pet.id) {
              Alert.alert('Delete pet', 'Are you sure?', [
                {
                  text: 'Yes',
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: 'No',
                  style: 'cancel',
                },
              ]);
            } else {
              Alert.alert(
                'delete error',
                'cannot delete pet because it does not have an id!'
              );
            }
          }}
          style={{ width: '50%', backgroundColor: 'darkred' }}
        />
      </View>
    </View>
  );
}
