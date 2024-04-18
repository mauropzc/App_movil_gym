import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, G } from 'react-native-svg';
import MenuBar from './MenuBar';
import useGlobalContext from './hooks/useGlobalContext';


const Report = () => {

  const { usuarios } = useGlobalContext();
  const peso = usuarios[0].peso;
  const peso_meta = usuarios[0].peso_meta;

  const porcentaje = (peso - 65) / (peso - peso_meta);

  const [dates, setDates] = useState([]);
  const { navigate } = useNavigation();

  const handleButtonPress = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const newDate = `${day} - ${month}`;

    if (dates.length >= 5) {
      const newDates = [...dates];
      newDates.splice(4, 1);
      setDates(newDates);
      if (dates.length = 4) {
        setDates([newDate, ...dates]);
      }
    } else {
      setDates([newDate, ...dates]);
    }
  };

  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };


  const ProgressCircle = ({ progress, size, strokeWidth }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressStrokeDashoffset = circumference - (progress / 100) * circumference;
  
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={`${size / 2},${size / 2}`}>
            {/* Fondo transparente */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              stroke="#E0E0E0" // Color del progreso
            />
            {/* Círculo de progreso */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#3498db" // Color del progreso
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${circumference}, ${circumference}`}
              strokeDashoffset={progressStrokeDashoffset}
            />
          </G>
        </Svg>
      </View>
    );
  };
  

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>CHECK-IN</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        {/* Renderiza los primeros dos bloques al lado del botón */}
        <View style={styles.dateRow}>
          {dates.slice(0, 2).map((date, index) => (
            <View key={index} style={styles.dateContainer}>
              <Text style={styles.dateText}>{date}</Text>
              <Image source={require('./../../assets/img/muscle2.png')} style={styles.image} />
              <Text style={styles.weightText}>65 kg</Text>
            </View>
          ))}
        </View>

        {/* Renderiza bloques adicionales debajo del tercer bloque */}
        {chunkArray(dates.slice(2), 3).map((group, index) => (
          <View key={index} style={styles.dateRow}>
            {group.map((date, i) => (
              <View key={i} style={styles.dateContainer}>
                <Text style={styles.dateText}>{date}</Text>
                <Image source={require('./../../assets/img/muscle2.png')} style={styles.image} />
                <Text style={styles.weightText}>65 kg</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Agregar contenedor para el título GOAL */}
      <View style={styles.goalContainer}>
        <Text style={styles.title}>GOAL</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Usando el componente ProgressCircle */}
          <View style={{ marginRight: 20 }}>
            <ProgressCircle progress={porcentaje*100} size={100} strokeWidth={16} backgroundColor="black" />
          </View>

          {/* Información de peso */}
          <View>
            <Text style={styles.weightInfo}>Initial</Text>
            <Text style={styles.weightInfo}>Actual</Text>
            <Text style={styles.weightInfo}>Goal</Text>
          </View>
          {/* Valores de peso */}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.weightValue}>{peso}kg</Text>
            <Text style={styles.weightValue}>65Kg</Text>
            <Text style={styles.weightValue}>{peso_meta}kg</Text>
          </View>
        </View>
      </View>
      {/* Porcentaje de progreso */}
          <Text style={styles.progressText}>{porcentaje*100}%</Text>
          <MenuBar navigation={navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 35,
    paddingHorizontal: 38,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: '#268de8',
    margin: 5,
  },
  weightText: {
    color: '#268de8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#268de8',
    fontSize: 25,
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateContainer: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 28,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: '#268de8',
    margin: 5,
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  dateText: {
    color: '#268de8',
    fontSize: 13,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 10, // Ajusta el espacio entre el texto y la imagen
  },
  goalContainer: {
    marginTop: 30, // Espacio entre el contenedor de fechas y el contenedor de objetivos
    alignItems: 'center',
    fontSize: 28,
  },
  weightInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 13,
    color: '#262626',
    marginRight: 125,
  },
  weightValue: {
    fontSize: 16,
    color: '#262626',
    marginBottom: 15,
  },
  progressText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#262626',
  marginTop: 10,
  marginLeft: -240,
},
separator: {
  borderBottomColor: '#268de8',
  borderBottomWidth: 1,
  marginLeft: 1, // Espacio entre el texto y el separador
  marginRight: 1, // Espacio entre el separador y el valor
}
});

export default Report;