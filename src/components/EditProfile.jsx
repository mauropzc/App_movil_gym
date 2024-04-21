// Perfil
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useGlobalContext from '../hooks/useGlobalContext'
import axios from 'axios'
import { API_URL } from '@env'

const EditProfile = () => {
  const { navigate } = useNavigation()
  const { usuarioActual, setUsuarioActual } = useGlobalContext()
  const [nombre, setNombre] = useState(usuarioActual.name)
  const [apellido, setApellido] = useState(usuarioActual.lastname)
  const [edad, setEdad] = useState(usuarioActual.age.toString())
  const [email, setEmail] = useState(usuarioActual.email)
  const [usuario, setUsuario] = useState(usuarioActual.username)

  const onPressProf = () => {
    saveUser()
    navigate('Profile')
  }

  const saveUser = async () => {
    try {
      const response = await axios.put(`${API_URL}/users/${usuarioActual.username}`, {
        name: nombre,
        lastname: apellido,
        age: parseInt(edad),
        email,
        username: usuario
      })
      setUsuarioActual(response.data)
      Alert.alert('Success', 'User updated successfully')
    } catch (error) {
      Alert.alert('Error', 'Error updating user')
    }
  }

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>EDIT INFORMATION</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
          placeholder='Pepito'
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setApellido}
          value={apellido}
          placeholder='Perez'
        />
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(text) => {
            const newText = text.replace(/[^0-9\b]/g, '')
            setEdad(newText)
          }}
          value={edad}
          placeholder='19'
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='name@example.com'
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsuario}
          value={usuario}
          placeholder='pepito_123'
        />
      </View>
      <TouchableOpacity onPress={onPressProf} style={styles.button}>
        <Image source={require('./../../assets/img/Edit.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '6%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 5

  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '95%',
    margin: 10

  },
  label: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    backgroundColor: 'white'

  },
  button: {
    width: 100,
    backgroundColor: '#268de8',
    height: 45,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonIcon: {
    height: '90%',
    width: '90%',
    borderRadius: 25
  }

})

export default EditProfile
