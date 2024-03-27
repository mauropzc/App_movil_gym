import React from "react";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image } from 'react-native';

const Check = () =>{
    const { navigate } = useNavigation();
    //Funcion para ir al login
    const onPress = () => {
        navigate ('Login')
     };
    return(
        <View style={styles.container}>

            <Text style={styles.title}>Check your</Text>
            <Text style={styles.title}>Email</Text>

            <Image style={styles.logo} source={require('./../../assets/img/email.png')}></Image>

            <TouchableOpacity
                onPress={onPress}
                style = {{
                    ...styles.button,
                    backgroundColor: '#2196f3'
                }}
            >  
                <Text
                    style = {{
                        ...styles.buttonText,
                        color: '#f1f1f1'
                    }}
                >Continue</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    
    logo: {
        //marginTop: 10,
        width: 150,
        height: 150
        //resizeMode: 'cover',
    },

    button: {
        alignSelf: 'center',
        borderRadius: 20,
        paddingVertical: 15,
        width: '90%',
        margin: 20
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 20
    }
})

export default Check