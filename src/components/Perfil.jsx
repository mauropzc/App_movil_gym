import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { Button_login } from '../../data/buttons';
import { CheckBox } from 'react-native-elements';

const Perfil = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
  
    const handleEdit = () => {
      // TODO: Implementar la lógica para actualizar la información del usuario
      // Enviar la información actualizada al servidor y manejar la respuesta
      console.log('Información actualizada!');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Editar perfil</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNombre}
            value={nombre}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            onChangeText={setApellido}
            value={apellido}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Edad</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newText = text.replace(/[^0-9\b]/g, '');
              setEdad(newText);
            }}
            value={edad}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsuario}
            value={usuario}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            onChangeText={setContraseña}
            value={contraseña}
          />
        </View>
        <Button title="Editar" onPress={handleEdit} style={styles.button} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      width: '95%',
    },
    label: {
      fontSize: 18,
      marginRight: 10,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      width: '80%',
    },
    button: {
      justifyContent: 'flex-end',
    },
  });
  
  export default Perfil;