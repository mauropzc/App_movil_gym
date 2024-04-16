import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import useGlobalContext from './hooks/useGlobalContext';
import axios from 'axios';

const Login = () => {
  const { navigate } = useNavigation();
  const { usuarios, setUsuarioActual } = useGlobalContext(); //Pasa las variables globales necesarias
  //const usuarios = getUsuarios();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('User or pass incorrect');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const onPressLog = () => {
    navigate ('Menu')
 };

  const onPress = () => {
     navigate ('perfil')
  };

  const onPressPass = () => {
     navigate ('Forgot')
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dstm3ct3-3000.use2.devtunnels.ms/api/auth/login', {
        username,
        password
      });
      console.log(response.data);
      setUsuarioActual(response.data);
      navigate('Menu');

    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', 'User or pass incorrect');
    }


  }


  return (
    
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./../../assets/img/logo_azul (1).png')}></Image>
      <Text style={styles.title}> Sign In</Text>
      <Text style={styles.labels}>   Username</Text>
      <TextInput
        style={styles.input}
        placeholder="name@example.com"
        onChangeText={setUsername}
      />
      
      <Text style={styles.labels}>   Password</Text>
      <TextInput
        style={styles.input}
        placeholder="*******"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
          
      <TouchableOpacity
        onPress={handleLogin}
      
        style = {{
            ...styles.button,
            backgroundColor: '#2196f3'
        }}
      >  
        <Text
            style = {{
                ...styles.buttonText,
                color: '#f1f1f1'
            }}
        >Log in</Text>
      </TouchableOpacity>

        <CheckBox
          title= "Remember me"
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.text}
        />

      <View style={styles.row}>
        <TouchableOpacity onPress={onPressPass}>
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
    flex: 1
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    padding: '5%',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: '3%',
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },
  labels: {

    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold'
  },
  logo: {
    //marginTop: 10,
    width: '100%',
    height: '40%',
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
    marginLeft: 15,
    
  },
  text_sign: {
    fontSize: 18,
    textAlign: 'right',
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginRight: 15,
    
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default Login