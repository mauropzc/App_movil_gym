import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useGlobalContext from './hooks/useGlobalContext';

const Perfil = () => {
  const { setUsuarioPerfil } = useGlobalContext();
  const { setUsuarioCheck } = useGlobalContext();

  const { usuarioActual } = useGlobalContext();

  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [user, setuser] = useState('');
  const [password, setPassword] = useState('');
  const [dates, setDates] = useState('');
  //Gestión de usuarios-----------------------------------
  const agregarUsuario = () => {
    const nuevoUsuario = {
      name: name,
      lastname: lastName,
      age: parseInt(age),
      email: email,
      username: user,
      password: password
    };
    const check = {
      dates: dates
    };
  
    setUsuarioPerfil(nuevoUsuario);
    setUsuarioCheck(check);
    
    navigate ('Physic')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PERSONAL INFORMATION</Text>
      </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              keyboardType="numeric"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={user}
              onChangeText={(text) => setuser(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

      <TouchableOpacity
        style={styles.button}
        onPress={agregarUsuario}
         // Navegar a Cod2 al presionar el botón
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    marginTop: '10%',
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
    marginTop: '10%',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  button: {
    width: '28%',
    marginTop: '10%',
    backgroundColor: '#268de8',
    padding: 10,
    borderRadius: 25,
    marginBottom: '5%',
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Perfil;
