import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useGlobalContext from './hooks/useGlobalContext';
import MenuBar from './MenuBar';
import { API_URL } from '@env';

const Menu = () => {
  const { navigate } = useNavigation();
  const {count, setCount } = useGlobalContext();
  const { lastIncrementDate, setLastIncrementDate } = useGlobalContext();
  const [catExcercises, setCatExcercises] = useState([]);

  useEffect(() => {
    getCatExcercises()
  }, [])

  const getCatExcercises = async () => {
    try {
      const response = await axios.get(`${API_URL}/catexcercises`);
      console.log(response.data)
      setCatExcercises(response.data)
    } catch (error) {
      console.log(error)
    }
  }

    const onPress = (idCatExcercise) => {
      navigate ('Ejercicio', { idCatExcercise })
      incrementCounter()
    };

    const incrementCounter = async () => {
      console.log('incrementCounter')
      const today = new Date().toDateString();
      const lastDate = lastIncrementDate

      console.log(today,lastDate)

      if (lastDate !== today) {
        // Si la fecha guardada no es igual a la fecha de hoy, aumentamos el contador y actualizamos la fecha guardada
        setCount(count + 1);
        setLastIncrementDate(today);
        setLastIncrementDate(today);
      }
    };

    const daysOfWeek = [];
    for (let i = 1; i <= 30; i++) {
      daysOfWeek.push(i.toString());
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerDays}>
          <Text style={[styles.tittleText,{top:4}]}>Week Goal</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={[styles.circle, index < count ? {backgroundColor: '#268de8'} : null]}>
              <Text style={[{color: 'black'}, index < count ? {color: 'white'} : null]}>{day}</Text>
            </View>
          ))}
        </ScrollView>
        </View>
        <View style={{height:'74%', top:35}}>
          <Text style={styles.tittleText}>Beginner</Text>
          {catExcercises.map((catExcercise) => (
            <TouchableOpacity 
              style={styles.button}
              key={catExcercise.id}
              onPress={() => onPress(catExcercise.id)}
            >
              <Image 
                source={{
                  uri: catExcercise.urlImg
                }} 
                style={styles.buttonImage} 
              />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>{catExcercise.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
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

  containerDays: {
    height: 100,
    bottom: 0,
    borderWidth: 0.5,
    borderColor: '#767676', // Color del borde
    borderRadius: 25,
    alignSelf: 'flex-start',
  },

  circle: {
    bottom:7,
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 25,
    borderColor: '#42a5f5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 7,
  },

  tittleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left', 
    marginLeft: 27,
    bottom: 10, 
  },

  button: {
    flex: 1,
    width: '97%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },

  buttonImage:{
    height: '100%',
    width:'100%',
    borderRadius: 25,
  },
  
  icon: {
    flex: 1,
    alignItems: 'center',
  },

  buttonIcon:{
    height: '80%',
    width:'80%',
    borderRadius: 25,
 },
  
  menubar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: '#767676',
    borderRadius: 25,
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
  },
  overlayText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

});

export default Menu;
