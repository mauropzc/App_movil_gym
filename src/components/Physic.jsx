import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Physic = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PHYSICAL INFORMATION</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}></Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}></Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter..."
            />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>cm</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter..."
            />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>kg</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight Goal</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter..."
              keyboardType="numeric"
            />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>kg</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Physical Goal</Text>
          <View style={styles.blueBox}>
            <Text style={styles.blueBoxText}>Lose Fat</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Physical Level</Text>
          <View style={styles.blueBox}>
            <Text style={styles.blueBoxText}>Beginner</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Next button pressed')} // Aquí puedes añadir la lógica para navegar a la siguiente pantalla
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  blueBox: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  blueBoxText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right : 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default Physic;