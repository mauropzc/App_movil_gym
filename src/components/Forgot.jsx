import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import axios from 'axios'
import { API_URL } from '@env'

const Forgot = () => {
  const { navigate } = useNavigation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const onPress = async () => {
    setLoading(true)
    try {
      await axios.post(`${API_URL}/email`, {
        email
      })
      Alert.alert('Success', 'Email sent')
      navigate('Check')
    } catch (error) {
      Alert.alert('Error', 'Email not found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Forgot</Text>
      <Text style={styles.title}>Password</Text>
      <Text style={styles.texto}>Enter your email to start the reset process</Text>
      <Text style={styles.subtitulo}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder='name@example.com'
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.button,
          backgroundColor: '#2196f3'
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: '#f1f1f1'
          }}
        >{loading ? 'Cargando...' : 'Reset'}
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left'
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 40
  },

  texto: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 50
  },

  subtitulo: {
    fontSize: 30,
    marginLeft: 20,
    fontWeight: 'bold'
  },

  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '90%',
    marginLeft: 20,
    backgroundColor: '#ffffff',
    marginBottom: 50
  },

  button: {
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 15,
    width: '90%',
    margin: 20
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 20
  }
})

export default Forgot
