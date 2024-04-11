//Edit
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuBar from './MenuBar';
import useGlobalContext from './hooks/useGlobalContext';

const Profile = () => {

  const { navigate } = useNavigation();

  const { usuarioActual } = useGlobalContext();

  const onPress2 = () => {
   
   };

  const onPressProfile = () => {
    navigate ('EditProfile')
  };


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./../../assets/img/logo_azul (1).png')}></Image>
      <View style={styles.overlay}><Text style={styles.overlayText}>{usuarioActual.nombre} {usuarioActual.apellido}</Text></View>
      <View style={styles.bar}>
        <TouchableOpacity style={styles.iconBar } onPress={onPress2}>
          <Image source={require('./../../assets/img/config.png')} style={styles.buttonIconBar} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBar } onPress={onPress2}>
          <Image source={require('./../../assets/img/notifications.png')} style={styles.buttonIconBar} />
        </TouchableOpacity>
        <Text style={{width: '60%'}}></Text>
        <TouchableOpacity style={styles.iconBar } onPress={onPressProfile}>
          <Image source={require('./../../assets/img/pencil.png')} style={styles.buttonIconBar} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/user.png')} style={{height: 45, width:45}} />
          <Text style={[styles.text, {fontWeight:'bold'}]}>User Name: </Text>
          <Text style={[styles.text,{paddingLeft:0,width:'40%'}]}>{usuarioActual.nombre} {usuarioActual.apellido}</Text>
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/email.png')} style={{height: 45, width:45}} />
          <Text style={[styles.text, {fontWeight:'bold'}]}>Email:</Text>
          <Text style={[styles.text,{paddingLeft:0,width:'40%'}]}>{usuarioActual.correo}</Text> 
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/key.png')} style={{height: 45, width:45}} />
          <Text style={[styles.text, {fontWeight:'bold'}]}>Password</Text>
          <Text style={[styles.text,{paddingLeft:0,width:'40%'}]}>{usuarioActual.password}</Text>
        </View>
      </View>
      
      <MenuBar navigation={navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column'
  },

  logo: {
    width: '100%',
    height: '30%',
  },

  body: {
    width: '100%',
    height: '40%',
    flexDirection: 'column',
    borderWidth: 0.5,
    alignItems: 'center',
  },

  text: {
    paddingRight: 0,
    paddingLeft: 30,
    textAlign: 'left',
    width: '30%',
  },

  dates: {
    flex: 1,
    height:'33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBar: {
    flex: 1,
    alignItems: 'center',
  },

  buttonIconBar:{
    height: '40%',
    width: '60%',
  },
  
  bar: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height:'28%',
  },
  overlayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

});

export default Profile;