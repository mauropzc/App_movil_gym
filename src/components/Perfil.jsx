import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { Button_login } from '../../data/buttons';
import { CheckBox } from 'react-native-elements';

const Perfil = () => {
    return (
        <Text style = {styles.title}>Este es el perfil</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        padding: 15,
        marginTop: 40
    }
})

export default Perfil