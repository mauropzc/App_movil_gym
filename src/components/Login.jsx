import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { Button_login } from '../../data/buttons';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Perfil from "./Perfil.jsx";

//Screen
//import Perfil from './perfil';

const Login = () => {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const onPress = () => {
      navigate ('perfil')
  };

  return (
  <View style={styles.container}>

    <Image style={styles.logo} source={require('./../../assets/img/logo_azul (1).png')}></Image>
    <Text style={styles.title}> Sign In</Text>
    <Text style={styles.labels}>   Username</Text>
    <TextInput
      style={styles.input}
      placeholder="name@example.com"
    />
    
    <Text style={styles.labels}>   Password</Text>
    <TextInput
      style={styles.input}
      placeholder="*******"
      secureTextEntry={true}
    />
        
    <Button_login />
      <CheckBox
        title= "Remember me"
        checked={rememberMe}
        onPress={() => setRememberMe(!rememberMe)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.text}
      />

    <View style={styles.row}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text_pass}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text_sign}>Sign Up</Text>
      </TouchableOpacity>
    </View>
        
  </View>
  )
  
  
};

const styles = StyleSheet.create({
  container: {
    //alignItems: 'left'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    padding: 15,
    marginTop: 40
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '90%',
    alignSelf: 'center'
  },
  labels: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold'
  },
  logo: {
    //marginTop: 10,
    width: '100%',
    height: '45%',
    resizeMode: 'cover',
  },
  checkboxContainer: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    marginTop: -20,
    marginLeft: 15
    
  },
  text_pass: {
    fontSize: 18,
    paddingHorizontal: 15,
    marginTop: 70,
    marginLeft: 15
  },
  text_sign: {
    fontSize: 18,
    textAlign: 'right',
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginTop: 70,
    marginRight: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Login

