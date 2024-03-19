import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const medicines = [
  { id: 1, name: 'Ibuprofen' },
  { id: 2, name: 'Paracetamol' },
  { id: 3, name: 'Aspirin' },
  { id: 4, name: 'Loratadine' },
  { id: 5, name: 'Diazepam' },
  { id: 6, name: 'Omeprazole' },
];

const MedicineSelectionScreen = ({ navigation, route }) => {
  const { grandparent } = route.params;
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const toggleMedicineSelection = (medicine) => {
    if (selectedMedicines.includes(medicine)) {
      setSelectedMedicines(selectedMedicines.filter((selected) => selected !== medicine));
    } else {
      setSelectedMedicines([...selectedMedicines, medicine]);
    }
  };

  const sendReminder = () => {
    if (selectedMedicines.length > 0) {
      const selectedMedicinesNames = selectedMedicines.map((medicine) => medicine.name).join(', ');
      Alert.alert(`${selectedMedicinesNames} were sent as a reminder for ${grandparent.name}`);
    } else {
      Alert.alert('Please select at least one medicine.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Medicine Selection for {grandparent.name}</Text>
      <View style={styles.medicineContainer}>
        {medicines.map((medicine) => (
          <TouchableOpacity
            key={medicine.id}
            style={[
              styles.medicineItem,
              selectedMedicines.includes(medicine) && styles.selectedMedicine,
            ]}
            onPress={() => toggleMedicineSelection(medicine)}
          >
            <Text style={styles.menuItemText}>{medicine.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.sendReminderButton} onPress={sendReminder}>
        <Text style={styles.buttonText}>Send Reminder</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.selectedMedicinesContainer}>
        <Text style={styles.selectedMedicinesText}>Selected Medicines:</Text>
        {selectedMedicines.map((medicine) => (
          <Text key={medicine.id} style={styles.selectedMedicineText}>{medicine.name}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f1e3',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3436',
  },
  medicineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  medicineItem: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 8,
    margin: 5,
  },
  selectedMedicine: {
    backgroundColor: '#3498db',
  },
  menuItemText: {
    fontSize: 16,
    color: '#2d3436',
  },
  sendReminderButton: {
    backgroundColor: '#e17055',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#e17055',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedMedicinesContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedMedicinesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedMedicineText: {
    fontSize: 16,
  },
});

export default MedicineSelectionScreen;
