import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { useRoute } from '@react-navigation/native';

const  Ejercicio= () => {

  const route = useRoute();
  const ejercicios = route.params.ejerciciosArray;

  const [indice, setIndice] = useState(0);

  const mostrarEjercicioAnterior = () => {
    if (indice > 0) {
      setIndice(indice - 1);
    }
  };

  const mostrarEjercicioSiguiente = () => {
    if (indice < ejercicios.length - 1) {
      setIndice(indice + 1);
    }
  };

  const daysOfWeek = [];
  for (let i = 1; i <= 30; i++) {
    daysOfWeek.push(i.toString());
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerExer}>
        < Text style={[styles.tittleText, {color: '#ffff'}]}>{ejercicios[indice].nombre}</Text>
      </View>
      <View style={styles.containerImgExer}>
        <Image source={ejercicios[indice].ejercicio} style={styles.gif} />
      </View>
      <View style={styles.containerCount}>
        <View style={{flexDirection: 'row'}}>
            < Text style={[styles.tittleText,{fontSize:20, flex:1}]}>SERIES</Text>
            < Text style={[styles.tittleText,{fontSize:20, flex:1}]}>REPS</Text>
        </View>
        <View style={{flexDirection: 'row', top:30}}>
            < Text style={[styles.tittleText,{fontSize:26, flex:1}]}>{ejercicios[indice].series}</Text>
            < Text style={[styles.tittleText,{fontSize:26, flex:1}]}>{ejercicios[indice].repeticiones}</Text>
        </View>
      </View>
      <View style={styles.pass_btns}>
        <TouchableOpacity style={styles.icon } onPress={mostrarEjercicioAnterior}>
            <Image source={require('./../../assets/img/previous.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon } onPress={mostrarEjercicioSiguiente}>
            <Image source={require('./../../assets/img/next.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column'
  },

  containerExer: {
    width: '100%',
    height: 100,
    backgroundColor:'#268de8',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: '5%'
  },

  containerImgExer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%'
  },

  containerCount: {
    width: '100%',
    height: 150,
    borderWidth: 0.5,
    borderColor: '#767676',
    borderRadius: 25,
    paddingVertical: 25,
  },

  tittleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  button: {
    flex: 1,
    width: '97%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },

  icon: {
    flex: 1,
    alignItems: 'center',
  },

  buttonIcon:{
    height: '50%',
    width:'60%',
    borderRadius: 25,
  },

  gif:{
    height: '100%',
    width:'100%',
    borderRadius: 25,
  },
  
  pass_btns: {
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

});

export default Ejercicio;