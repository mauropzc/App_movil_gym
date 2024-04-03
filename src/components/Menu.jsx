
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuBar from './MenuBar';

const Menu = () => {

const { navigate } = useNavigation();

  const ejerciciosPierna = [
    { ejercicio: require('./../../assets/img/Ejp1.gif'), nombre: 'STEPUPK NEELIFT REVERSE', series: '4', repeticiones:'20' },
    { ejercicio: require('./../../assets/img/Ejp2.gif'), nombre: 'SQUAT THRUST', series: '4', repeticiones:'22' },
    { ejercicio: require('./../../assets/img/Ejp3.gif'), nombre: 'SQUAT JUMP', series: '3', repeticiones:'20' },
  ];

  const ejerciciosEspalda = [
    { ejercicio: require('./../../assets/img/Eje1.gif'), nombre: 'SUPERMAN', series: '4', repeticiones:'22' },
    { ejercicio: require('./../../assets/img/Eje2.gif'), nombre: 'T-FLEXION', series: '3', repeticiones:'20' },
    { ejercicio: require('./../../assets/img/Eje3.gif'), nombre: 'INVERTED ROW', series: '4', repeticiones:'15' },
  ];

  const ejerciciosPecho = [
    { ejercicio: require('./../../assets/img/Ejpe1.gif'), nombre: 'DIAMOND PUSHUP', series: '4', repeticiones:'15' },
    { ejercicio: require('./../../assets/img/Ejpe2.gif'), nombre: 'ONE ARM PUSHUP', series: '2', repeticiones:'10' },
    { ejercicio: require('./../../assets/img/Ejpe3.gif'), nombre: 'SPIDERMAN PUSHUP', series: '3', repeticiones:'5' },
  ];

  const onPress = (ejerciciosArray) => {
    navigate ('Ejercicio', { ejerciciosArray })
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
            <View key={index} style={styles.circle}>
              <Text style={{color: 'black'}}>{day}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{height:'74%', top:35}}>
        <Text style={styles.tittleText}>Beginner</Text>
        <TouchableOpacity style={styles.button } onPress={() => onPress(ejerciciosPierna)}>
          <Image source={require('./../../assets/img/leg.png')} style={styles.buttonImage} />
          <View style={styles.overlay}><Text style={styles.overlayText}>LEGS</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPress(ejerciciosPecho)}>
          <Image source={require('./../../assets/img/chest.png')} style={styles.buttonImage} />
          <View style={styles.overlay}><Text style={styles.overlayText}>CHEST</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPress(ejerciciosEspalda)}>
          <Image source={require('./../../assets/img/back.png')} style={styles.buttonImage} />
          <View style={styles.overlay}><Text style={styles.overlayText}>BACK</Text></View>
        </TouchableOpacity>
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
