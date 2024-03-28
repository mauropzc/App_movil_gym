//Perfil
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {

    const { navigate } = useNavigation();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const onPressProf = () => {
    navigate ('Profile')
  };

  const handleEdit = () => {
    // TODO: Implementar la lógica para actualizar la información del usuario
    // Enviar la información actualizada al servidor y manejar la respuesta
    console.log('Información actualizada!');
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>EDIT INFORMATION</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
        style={styles.input}
        onChangeText={setNombre}
        value={nombre}
        placeholder="Pepito"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setApellido}
          value={apellido}
          placeholder="Perez"
        />
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => {
            const newText = text.replace(/[^0-9\b]/g, '');
            setEdad(newText);
          }}
          value={edad}
          placeholder="19"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="name@example.com"
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsuario}
          value={usuario}
          placeholder="pepito_123"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setContraseña}
          value={contraseña}
          placeholder="**********"
          secureTextEntry={true}
        />
      </View>
      < TouchableOpacity  onPress={onPressProf} style={styles.button} >
        <Image source={require('./../../assets/img/Edit.png')} style={styles.buttonIcon} />
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 5,

  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '95%',
    margin: 10,
    
  },
  label: {
    fontSize: 18,
    paddingVertical:10,
    paddingHorizontal:10,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    
  },
  button: {
    width: 100,
    backgroundColor: '#268de8',
    height: 45,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonIcon:{
    height: '90%',
    width:'90%',
    borderRadius: 25,
  },
  
});

export default EditProfile;