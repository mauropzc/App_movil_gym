import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

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
            <View style={styles.menubar}>
                <TouchableOpacity style={styles.icon } onPress={onPress}>
                    <Image source={require('./../../assets/img/exersise.png')} style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon } onPress={onPress}>
                    <Image source={require('./../../assets/img/food.png')} style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon } onPress={onPress}>
                    <Image source={require('./../../assets/img/report.png')} style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon } onPress={onPress}>
                    <Image source={require('./../../assets/img/profile.png')} style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, {marginTop:'2%'}]}>DAILY FOOD</Text>
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
})
export default Food;