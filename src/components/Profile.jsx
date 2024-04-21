import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MenuBar from './MenuBar'
import useGlobalContext from '../hooks/useGlobalContext'

const Profile = () => {
  const { navigate } = useNavigation()
  const { usuarioActual } = useGlobalContext()

  const onPressProfile = () => {
    navigate('EditProfile')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./../../assets/img/logo_azul (1).png')} />
      <View style={styles.overlay}><Text style={styles.overlayText}>{usuarioActual.username}</Text></View>
      <View style={styles.bar}>
        <Text style={{ width: '60%' }} />
        <TouchableOpacity style={styles.iconBar} onPress={onPressProfile}>
          <Image source={require('./../../assets/img/pencil.png')} style={styles.buttonIconBar} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/user.png')} style={{ height: 25, width: 22 }} />
          <Text style={[styles.text, { fontWeight: 'bold' }]}>User Name: </Text>
          <Text style={[styles.text, { paddingLeft: 0, width: '40%' }]}>{usuarioActual.username}</Text>
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/user2.png')} style={{ height: 25, width: 22 }} />
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Name: </Text>
          <Text style={[styles.text, { paddingLeft: 0, width: '40%' }]}>{[usuarioActual.name, ' ', usuarioActual.lastname]}</Text>
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/email.png')} style={{ height: 25, width: 25 }} />
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Email:</Text>
          <Text style={[styles.text, { paddingLeft: 0, width: '40%' }]}>{usuarioActual.email}</Text>
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/age.png')} style={{ height: 25, width: 25 }} />
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Age:</Text>
          <Text style={[styles.text, { paddingLeft: 0, width: '40%' }]}>{usuarioActual.age}</Text>
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/goal.png')} style={{ height: 25, width: 25 }} />
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Goal:</Text>
          <Text style={[styles.text, { paddingLeft: 0, width: '40%' }]}>meta peso</Text>
        </View>
      </View>

      <MenuBar navigation={navigate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column'
  },

  logo: {
    width: '100%',
    height: '30%'
  },

  body: {
    width: '100%',
    height: '40%',
    flexDirection: 'column',
    borderWidth: 0.5,
    alignItems: 'center'
  },

  text: {
    paddingRight: 0,
    paddingLeft: 30,
    textAlign: 'left',
    width: '30%',
    color: 'black'
  },

  dates: {
    flex: 1,
    height: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconBar: {
    flex: 1,
    alignItems: 'center'
  },

  buttonIconBar: {
    height: '45%',
    width: '35%',
    alignSelf: 'flex-end'
  },

  bar: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '3%'
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '28%'
  },
  overlayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }

})

export default Profile
