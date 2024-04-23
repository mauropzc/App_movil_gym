import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, TextInput, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import MenuBar from './MenuBar'
import ProgressCircle from 'react-native-progress-circle'
import useGlobalContext from '../hooks/useGlobalContext'
import { API_URL } from '@env'

const Report = () => {
  const { navigate } = useNavigation()
  const navigation = useNavigation()
  const { usuarioActual, setUsuarioActual } = useGlobalContext()
  const [modalVisible, setModalVisible] = useState(false)
  const [physicalInfo, setPhysicalInfo] = useState({})
  const [regDiaries, setRegDiaries] = useState([])

  const [actual, setActual] = useState('')
  const [dates, setDates] = useState([])
  const { usuarios, setUsuarios } = useGlobalContext()
  const peso = physicalInfo.weight
  const peso_meta = physicalInfo.weightGoal
  
  const pesos = {
    weight : physicalInfo.weight,
    weightGoal : physicalInfo.weightGoal,
    weightActual : 70
    
  }

  useEffect(() => {
    getPhysicalInfoUser()
    getRegDiaryByUser()
  }, [])

  const getPhysicalInfoUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/physicalinfo/${usuarioActual.id}`)
      setPhysicalInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRegDiaryByUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/regdiaries/${usuarioActual.id}`)
      setRegDiaries(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // imprimir los check-in creados
  const verificar_dates = () => {
    console.log(dates)
  }

  // visualizar el Modal
  const handlePress = () => {
    setModalVisible(true)
  }

  // Cuando se agrega o cancela el peso actual
  const limpiar = () => {
    setModalVisible(false)
    setActual('')
  }

  // Cuando se agrega un check-in
  const handleButtonPress = () => {
    const peso_actual = actual
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.toLocaleString('default', { month: 'short' })
    const newDate = `${day} - ${month},${peso_actual}`

    if (dates.length >= 5) {
      const newDates = [...dates]
      newDates.splice(4, 1)
      setDates(newDates)
      if (dates.length = 4) {
        setDates([newDate, ...dates])
      }
    } else {
      setDates([newDate, ...dates])
    }
  }

  // Para renderisar los bloques
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size))
      }
      return acc
    }, [])
  }

  const datesRef = useRef(dates)

  useEffect(() => {
    setDates(usuarioActual.dates || [])
  }, [usuarioActual.dates])

  // Guardar los datos al salir del componente
  useEffect(() => {
    // Actualizar la referencia mutable
    datesRef.current = dates
  }, [dates])

  useEffect(() => {
    const saveDatesToUser = () => {
      setUsuarioActual(prevUsuario => ({
        ...prevUsuario,
        dates: datesRef.current // Usar la referencia mutable
      }))
    }

    // Guardar los datos al salir del componente
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      saveDatesToUser()
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const saveDatesToUser = () => {
      // Buscar al usuario actual dentro de la lista de usuarios
      const updatedUsuarios = usuarios.map(usuario => {
        if (usuario.username === usuarioActual.username) {
          // Actualizar las fechas del usuario actual
          return {
            ...usuario,
            dates: datesRef.current // Usar la referencia mutable
          }
        }
        return usuario
      })
      // Actualizar el estado global de usuarios
      setUsuarios(updatedUsuarios)
    }

    // Guardar los datos al salir del componente
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      saveDatesToUser()
    })

    return unsubscribe
  }, [navigation, setUsuarios, usuarioActual.username, usuarios])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHECK-IN</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { handlePress(); verificar_dates() }}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        {/* Pedir el peso actual */}
        <Modal
          animationType='slide'
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Ingrese su peso actual:</Text>
              <TextInput
                style={styles.input}
                placeholder='Kg'
                keyboardType='numeric'
                onChangeText={text => setActual(text)}
                value={actual}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title='Cancelar' onPress={() => setModalVisible(false)} />
                <Button title='Agregar' onPress={() => { limpiar(); handleButtonPress() }} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Renderiza los primeros dos bloques al lado del botón */}
        <View style={styles.dateRow}>
          {dates.slice(0, 2).map((date, index) => {
            // Dividir la cadena en partes usando la coma como separador
            const parts = date.split(',')

            return (
              <View key={index} style={styles.dateContainer}>
                <Text style={styles.dateText}>{parts[0]}</Text>
                <Image source={require('./../../assets/img/muscle2.png')} style={styles.image} />
                <Text style={styles.weightText}>{parts[1]}kg</Text>
              </View>
            )
          })}
        </View>

        {/* Renderiza bloques adicionales debajo del tercer bloque */}
        {chunkArray(dates.slice(2), 3).map((group, index) => (
          <View key={index} style={styles.dateRow}>
            {group.map((date, i) => {
              // Dividir la cadena en partes usando la coma como separador
              const parts = date.split(',')

              return (
                <View key={i} style={styles.dateContainer}>
                  <Text style={styles.dateText}>{parts[0]}</Text>
                  <Image source={require('./../../assets/img/muscle2.png')} style={styles.image} />
                  <Text style={styles.weightText}>{parts[1]}kg</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>

      {/* Agregar contenedor para el título GOAL */}
      <View style={styles.goalContainer}>
        <Text style={styles.title}>GOAL</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Usando el componente ProgressCircle */}
          <View style={{ marginRight: 20 }}>
            <View style={styles.ProgressCircle}>
            <ProgressCircle
              percent={50}
              radius={50}
              borderWidth={14}
              color='#268de8'
              shadowColor='#E8E8E8'
              bgColor='#fff'
            >
              
            </ProgressCircle>
          </View>
          </View>

          {/* Información de peso */}
          <View>
            <Text style={styles.weightInfo}>Initial</Text>
            <Text style={styles.weightInfo}>Actual</Text>
            <Text style={styles.weightInfo}>Goal</Text>
          </View>
          {/* Valores de peso */}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.weightValue}>{pesos.weight}kg</Text>
            <Text style={styles.weightValue}>{pesos.weightActual}kg</Text>
            <Text style={styles.weightValue}>{pesos.weightGoal}kg</Text>
          </View>
        </View>
      </View>
      {/* Porcentaje de progreso */}

      {dates.length > 0
        ? (
            peso === peso_meta
              ? (
                  peso_meta - dates[0].split(',')[1] < 0
                    ? (
                      <Text style={styles.progressText}>{((100) - (((peso_meta - dates[0].split(',')[1]) / peso_meta) * -100)).toFixed(2)}%</Text>
                      )
                    : peso_meta - dates[0].split(',')[1] === 0
                      ? (
                        <Text style={styles.progressText}>{100}.00%</Text>
                        )
                      : (
                        <Text style={styles.progressText}>{((100) - (((peso_meta - dates[0].split(',')[1]) / peso_meta) * 100)).toFixed(2)}%</Text>
                        )
                )
              : (
                <Text style={styles.progressText}>{(100 * ((peso - dates[0].split(',')[1]) / (peso - peso_meta))).toFixed(2)}%</Text>
                )
          )
        : peso === peso_meta
          ? (
            <Text style={styles.progressText}>{100}.00%</Text>)
          : (<Text style={styles.progressText}>{0}.00%</Text>)}

      <MenuBar navigation={navigate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 30
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  ProgressCircle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00FF0000',
    padding: '3%'
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 35,
    paddingHorizontal: 38,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: '#268de8',
    margin: 5
  },
  weightText: {
    color: '#268de8',
    fontSize: 12,
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#268de8',
    fontSize: 25,
    fontWeight: 'bold'
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  dateContainer: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 28,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: '#268de8',
    margin: 5,
    alignItems: 'center' // Centra los elementos horizontalmente
  },
  dateText: {
    color: '#268de8',
    fontSize: 13,
    fontWeight: 'bold'
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 10 // Ajusta el espacio entre el texto y la imagen
  },
  goalContainer: {
    marginTop: 30, // Espacio entre el contenedor de fechas y el contenedor de objetivos
    alignItems: 'center',
    fontSize: 28
  },
  weightInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 13,
    color: '#262626',
    marginRight: 125
  },
  weightValue: {
    fontSize: 16,
    color: '#262626',
    marginBottom: 15
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262626',
    marginTop: 10,
    marginLeft: -240
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10
  }
})

export default Report
