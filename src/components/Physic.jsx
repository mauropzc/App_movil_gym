import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useGlobalContext from './hooks/useGlobalContext';
//import { agregarUsuario } from './Perfil';

const Physic = () => {
  const { crearUsuario } = useGlobalContext();
  const { navigate } = useNavigation();
  const { width, height } = Dimensions.get('window');
  const [altura, setAltura] = useState('');
  const container1Height = height * 0.1; // Porcentaje para titulo


  const agregarUsuario = () => {
    const nuevoUsuario = {
      altura: altura,
      
    };
  
    crearUsuario(nuevoUsuario);
    navigate ('Login')
    
  };



  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { height: container1Height }]}>
        <Text style={styles.title}>PHYSICAL INFORMATION</Text>
      </View>
      <View style={[styles.formContainer, { marginTop: Dimensions.get('window').height * 0.02 }]}>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').height * 0.01 }]}>
          <Text style={styles.label}>Height</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter..."
              value={altura}
              onChangeText={(text) => setAltura(text)}
            />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>cm</Text>
            </View>
          </View>
        </View>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').height * 0.01 }]}>
          <Text style={styles.label}>Weight</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter..."
            />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>kg</Text>
            </View>
          </View>
        </View>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').height * 0.01 }]}>
          <Text style={styles.label}>Weight Goal</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter..."
              keyboardType="numeric"
            />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>kg</Text>
            </View>
          </View>
        </View>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').height * 0.01 }]}>
          <Text style={styles.label}>Physical Goal</Text>
          <View style={styles.blueBox}>
            <Text style={styles.blueBoxText}>Lose Fat</Text>
          </View>
        </View>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').height * 0.01 }]}>
          <Text style={styles.label}>Physical Level</Text>
          <View style={styles.blueBox}>
            <Text style={styles.blueBoxText}>Beginner</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            bottom: Dimensions.get('window').height * 0.05,
            right: Dimensions.get('window').width * 0.05,
            paddingVertical: Dimensions.get('window').height * 0.015,
            paddingHorizontal: Dimensions.get('window').width * 0.08,
            borderRadius: Dimensions.get('window').width * 0.07,
          },
        ]}
        onPress={agregarUsuario}
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').height * 0.001,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.05,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: Dimensions.get('window').width * 0.025,
    width: '70%',                                    
  },
  blueBox: {
    backgroundColor: '#268de8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Dimensions.get('window').width * 0.025,
    borderRadius: 5,
  },
  blueBoxText: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.04,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#268de8',
    borderRadius: Dimensions.get('window').width * 0.07,
  },
  buttonText: {
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Physic;