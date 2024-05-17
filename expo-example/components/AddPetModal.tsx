import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
  onAddPet: (newPet: { name: string; type: string; age: number }) => void;
  initialPet?: { name: string; type: string; age: number };
}

const AddPetModal: React.FC<AddPetModalProps> = ({ visible, onClose, onAddPet, initialPet }) => {
  const [newPetName, setNewPetName] = useState('');
  const [newPetType, setNewPetType] = useState('');
  const [newPetAge, setNewPetAge] = useState('');

  useEffect(() => {
    if (initialPet) {
      setNewPetName(initialPet.name);
      setNewPetType(initialPet.type);
      setNewPetAge(initialPet.age.toString());
    }
  }, [initialPet]);

  const handleAddPet = () => {
    onAddPet({
      name: newPetName,
      type: newPetType,
      age: parseInt(newPetAge, 10),
    });
    setNewPetName('');
    setNewPetType('');
    setNewPetAge('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter pet name"
            value={newPetName}
            onChangeText={setNewPetName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter pet type"
            value={newPetType}
            onChangeText={setNewPetType}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter pet age"
            value={newPetAge}
            onChangeText={setNewPetAge}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddPet}>
            <Text style={styles.buttonText}>{initialPet ? 'Update Pet' : 'Add Pet'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddPetModal;
