//Perfil
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useGlobalContext from './hooks/useGlobalContext';

const EditProfile = () => {

  const { navigate } = useNavigation();
  const { usuarios, setUsuarios, usuarioActual, setUsuarioActual } = useGlobalContext();
  const [nombre, setNombre] = useState(usuarioActual.nombre);
  const [apellido, setApellido] = useState(usuarioActual.apellido);
  const [edad, setEdad] = useState(usuarioActual.edad);
  const [email, setEmail] = useState(usuarioActual.correo);
  const [usuario, setUsuario] = useState(usuarioActual.username);

  const onPressProf = () => {
    guardarCambios()
    navigate ('Profile')
  };

  const guardarCambios = async () => {
    if (usuarioActual) {
      // Crear una copia del arreglo de usuarios
      const nuevosUsuarios = [...usuarios];
      const index = nuevosUsuarios.findIndex(u => u.username === usuarioActual.username);
      if (index !== -1) {
        // Verificar si el nuevo nombre de usuario ya está en uso
        const usernameEnUso = nuevosUsuarios.some((u, i) => i !== index && u.username === usuario);
        if (usernameEnUso) {
          alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
        } else {
          nuevosUsuarios[index].nombre = nombre;
          nuevosUsuarios[index].apellido = apellido;
          nuevosUsuarios[index].edad = edad;
          nuevosUsuarios[index].correo = email;
          nuevosUsuarios[index].username = usuario;
          await setUsuarios(nuevosUsuarios);
          setUsuarioActual(usuarios.find(user => user.username === usuario));
          alert('Los cambios se guardaron correctamente.');
        }
      } else {
        alert('Usuario no encontrado.');
      }
    }
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
    paddingTop: '6%'
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