import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const coffeeMenu = [
  { id: 1, name: 'SenelisA', age: 75, image: require('./assets/snejor1.jpg') },
  { id: 2, name: 'SenelisB', age: 67, image: require('./assets/senjor2.png') },
  { id: 3, name: 'Mociute', age: 80, image: require('./assets/senjor3.jpg') },
];

const MainApp = () => {
  const navigation = useNavigation();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [heartRate, setHeartRate] = useState(0);
  const [bodyTemperature, setBodyTemperature] = useState(0);
  const [stepsMade, setStepsMade] = useState(0);
  const [condition, setCondition] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    generateHealthData();
    generateRandomTime();
  }, []);

  const generateHealthData = () => {
    setHeartRate(Math.floor(Math.random() * (130 - 60) + 60)); // Random heart rate between 60 and 130
    setBodyTemperature((Math.random() * (38.0 - 36.0) + 36.0).toFixed(1)); // Random body temperature between 36.0 and 38.0
    setStepsMade(Math.floor(Math.random() * (10000 - 1000) + 1000)); // Random steps between 1000 and 10000
    setCondition(Math.random() < 0.5 ? 'Awake' : 'Sleeping'); // Randomly generate awake or sleeping condition
  };

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1; // Random hours between 1 and 12
    const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
    const ampm = Math.random() < 0.5 ? 'AM' : 'PM'; // Randomly generate AM or PM

    setCurrentTime(`${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`);
  };

  const placeOrder = () => {
    if (selectedItem) {
      setOrderId(generateRandomOrderId());
      setOrderPlaced(true);
    } else {
      Alert.alert('Select a Grandparent');
    }
  };

  const resetOrder = () => {
    setOrderPlaced(false);
    setSelectedItem(null);
    setOrderId(null);
    generateHealthData(); // Regenerate health data when resetting order
    generateRandomTime(); // Regenerate time when resetting order
  };

  const generateRandomOrderId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const logout = () => {
    navigation.navigate('HomeScreen');
  };

  const contact911 = () => {
    Alert.alert('Contacting 911');
  };

  const sendReminder = () => {
    if (!selectedItem) {
      Alert.alert('Select a Grandparent');
    } else {
      navigation.navigate('MedicineSelectionScreen', { grandparent: coffeeMenu.find((item) => item.id === selectedItem) });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./assets/health.png')} style={styles.logo} />
      <Text style={styles.header}>Grandparents</Text>

      <ScrollView contentContainerStyle={styles.menuContainer}>
        {!orderPlaced ? (
          <>
            {coffeeMenu.map((item) => (
              <View key={item.id} style={styles.menuItemContainer}>
                <TouchableOpacity
                  style={[styles.menuItem, selectedItem === item.id && styles.selectedItem]}
                  onPress={() => setSelectedItem(item.id)}
                  disabled={selectedItem === item.id}
                >
                  <Text style={styles.menuItemText}>{item.name}, Age - {item.age}</Text>
                </TouchableOpacity>
                <Image source={item.image} style={styles.coffeeImage} />
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={placeOrder}>
              <Text style={styles.buttonText}>Check Health</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={sendReminder}>
              <Text style={styles.buttonText}>Send Reminder</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.selectedSenior}>Selected Senior: {coffeeMenu.find((item) => item.id === selectedItem)?.name}</Text>
            <Text style={styles.healthInfo}>Heart Rate: {heartRate} BPM</Text>
            <Text style={styles.healthInfo}>Body Temperature: {bodyTemperature} °C</Text>
            <Text style={styles.healthInfo}>Steps Made: {stepsMade}</Text>
            <Text style={styles.healthInfo}>Status: {condition}</Text>
            <Text style={styles.timeInfo}>Time: {currentTime}</Text>
            <Text style={styles.conditionInfo}>Condition: {heartRate < 90 ? 'Bad' : (heartRate <= 130 ? 'Very Good' : 'Very Bad')}</Text>
            <TouchableOpacity style={styles.button} onPress={resetOrder}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton} onPress={contact911}>
              <Text style={styles.buttonText}>Contact 911</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f1e3',
    paddingTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3436',
  },
  menuContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 8,
  },
  menuItem: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 8,
    width: '60%',
  },
  selectedItem: {
    backgroundColor: '#3498db',
  },
  menuItemText:{
    fontSize: 16,
    color: '#2d3436',
  },
  coffeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#e17055',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
  },
  selectedSenior: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  healthInfo: {
    fontSize: 16,
    color: '#2d3436',
    marginTop: 10,
  },
  timeInfo: {
    fontSize: 16,
    color: '#2d3436',
    marginTop: 10,
  },
  conditionInfo: {
    fontSize: 16,
    color: '#2d3436',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#e17055',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
  },
  contactButton: {
    backgroundColor: '#e17055',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default MainApp;

