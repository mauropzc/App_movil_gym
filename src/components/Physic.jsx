import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useGlobalContext from './hooks/useGlobalContext'
import RNPickerSelect from 'react-native-picker-select'
// import { agregarUsuario } from './Perfil';

const Physic = () => {
  const { crearUsuario } = useGlobalContext()
  const { navigate } = useNavigation()
  const { width, height } = Dimensions.get('window')
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')
  const [peso_meta, setPeso_meta] = useState('')
  const [goal, setGoal] = useState('Lose Fat')
  const [level, setLevel] = useState('Beginner')
  const container1Height = height * 0.1 // Porcentaje para titulo

  const agregarUsuario = () => {
    const nuevoUsuario = {
      height: parseInt(altura),
      weight: parseFloat(peso),
      weightGoal: parseFloat(peso_meta),
      physicalGoal: goal,
      physicalLevel: level
    }
    // try {
    //   crearUsuario(nuevoUsuario);
    //   navigate('Login');
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert('Error', 'Error creating user');
    // }
    crearUsuario(nuevoUsuario)
    navigate('Login')
  }

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
              placeholder='Enter...'
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
              placeholder='Enter...'
              value={peso}
              onChangeText={(text) => setPeso(text)}
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
              placeholder='Enter...'
              keyboardType='numeric'
              value={peso_meta}
              onChangeText={(text) => setPeso_meta(text)}
            />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>kg</Text>
            </View>
          </View>
        </View>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').height * 0.01 }]}>
          <Text style={styles.label}>Physical Goal</Text>

          <RNPickerSelect
            style={styles.pickerSelect}
            placeholder={{ label: 'Lose Fat', value: 'Lose_Fat' }}
            items={[
              { label: 'Keep Fat', value: 'Keep_Fat' },
              { label: 'Gain Fat', value: 'Gain_Fat' }
            ]}
            value={goal}
            onValueChange={(text) => setGoal(text)}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').height * 0.01 }]}>
          <Text style={styles.label}>Physical Level</Text>
          <RNPickerSelect
            style={styles.pickerSelect}
            placeholder={{ label: 'Beginner', value: 'Beginner' }}
            items={[
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Advanced', value: 'Advanced' }
            ]}
            value={level}
            onValueChange={(text) => setLevel(text)}

            useNativeAndroidPickerStyle={false}
          />

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
            borderRadius: Dimensions.get('window').width * 0.07
          }
        ]}
        onPress={agregarUsuario}
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Dimensions.get('window').width * 0.05
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  formContainer: {
    width: '100%'
  },
  inputContainer: {
    width: '100%'
  },
  label: {
    fontSize: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').height * 0.001
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.05
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: Dimensions.get('window').width * 0.025,
    width: '70%'
  },
  blueBox: {
    backgroundColor: '#268de8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Dimensions.get('window').width * 0.025,
    borderRadius: 5
  },
  blueBoxText: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.04
  },
  button: {
    position: 'absolute',
    backgroundColor: '#268de8',
    borderRadius: Dimensions.get('window').width * 0.07
  },
  buttonText: {
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  pickerSelect: {
    inputAndroid: {
      fontSize: 20,
      width: '100%',
      left: 1,
      fontWeight: 'bold',
      color: '#268de8',
      paddingHorizontal: 100,
      paddingVertical: 7,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#268de8'
    },
    placeholder: {
      color: '#268de8'
    }
  }
})

export default Physic
