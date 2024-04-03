import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Svg, { Circle, G } from 'react-native-svg';
import MenuBar from './MenuBar';

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
  

const Food = () => {
    const { navigate } = useNavigation();
    const swiperRef = useRef(null);

    const onPress = () => {
        
    };

    useEffect(() => {
        const interval = setInterval(() => {
        if (swiperRef.current && swiperRef.current.state.index < swiperRef.current.state.total - 1) {
            swiperRef.current.scrollBy(1);
        } else {
            swiperRef.current.scrollBy(-swiperRef.current.state.total + 1);
        }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={[styles.title, {textDecorationLine: 'underline'}]}>RECIPES</Text>
            </View>
                <View style={{height: '30%', width: '100%'}}>
                    <Swiper
                        style={{marginTop: '2%'}}
                        ref={swiperRef}
                        loop={false}
                        autoplay={true}
                        showsPagination={true}
                    >
                        <Image source={require('./../../assets/img/Receta1.jpg')} style={{flex: 1, width:'100%'}} />
                        <Image source={require('./../../assets/img/Receta2.jpg')} style={{flex: 1, width:'100%'}} />
                    </Swiper>
                </View>
            
                <Text style={[styles.title, {marginTop:'2%'}]}>DAILY FOOD</Text>

                <View style={styles.body}>
                    <View style={styles.dates}>
                        <Text style={[styles.text,]}>Proteins</Text>
                        <Text style={[styles.text,]}>Carbs</Text>
                        <Text style={[styles.text,]}>Fats</Text>
                    </View>
                    <View style={[styles.dates, {textAlign: 'flex-end'}]}>
                        <Text style={[styles.text,{textAlign: 'right'}]}>0.0 g</Text>
                        <Text style={[styles.text,{textAlign: 'right'}]}>0.0 g</Text>
                        <Text style={[styles.text,{textAlign: 'right'}]}>0.0 g</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#00FF0000' }}>
                    {/* Usando el componente ProgressCircle */}
                        <ProgressCircle progress={10} size={80} strokeWidth={5} backgroundColor="black" />
                </View>
            </View>
            <MenuBar navigation={navigate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        flexDirection: 'column'
    },
  
    containerTitle: {
        width: '100%',
        height: '10%',
        borderWidth: 0.5,
        borderColor: '#767676',
        borderRadius: 25,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        justifyContent: 'center',
      },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#268de8',
      },

      body: {
        width: '100%',
        height: '12%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%',
      },
    
      text: {
        marginBottom: '5%',
        paddingRight: 0,
        width: '100%',
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        textAlign: 'left',
      },
    
      dates: {
        flex: 1,
        width: '100%',
        height:'33%',
        flexDirection: 'column',
        justifyContent: 'center',
      },

})
export default Food;