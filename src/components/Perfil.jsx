import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import RNFS from 'react-native-fs';

const Perfil = () => {
  //const [usuarios, setUsuarios] = useState([]);
  //const [nombre, setNombre] = useState('');
  //const [apellido, setApellido] = useState('');
  //const pathToFile = `${RNFS.DocumentDirectoryPath}/usuarios.json`;
  const { navigate } = useNavigation();

  /*useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSubmit = () => {
    // ...
    guardarUsuarios();
  };

  const handleChangeNombre = (text) => {
    setNombre(text);
  };
  
  const handleChangeApellido = (text) => {
    setApellido(text);
  };

  const nuevoUsuario = {
    nombre,
    apellido,
    edad: 25, 
    email: "ana.perez@correo.com", 
    usuario: "ana_perez", 
    contraseña: "123456", 
  };
  
  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
    actualizarArchivoJSON();
  };

  const guardarUsuarios = async () => {
    try {
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    } catch (error) {
      console.log(error);
    }
  };
  
  const cargarUsuarios = async () => {
    try {
      const usuariosJson = await AsyncStorage.getItem('usuarios');
      if (usuariosJson !== null) {
        setUsuarios(JSON.parse(usuariosJson));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarArchivoJSON = async () => {
    try {
      await RNFS.writeFile(pathToFile, JSON.stringify(usuarios));
    } catch (error) {
      console.log(error);
    }
  };*/

  const onPress = () => {
    navigate ('Physic')
  };

  //Gestión de usuarios-----------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PERSONAL INFORMATION</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            //onChangeText={handleChangeNombre}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            //onChangeText={handleChangeApellido}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
         // Navegar a Cod2 al presionar el botón
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    marginTop: '10%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Perfil;