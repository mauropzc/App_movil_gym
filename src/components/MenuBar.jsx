import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const MenuBar = () => {
  const navigation = useNavigation()

  const onPress = (ejerciciosArray) => {
    navigate('Ejercicio', { ejerciciosArray })
  }

  const goToScreen = (screenName) => {
    navigation.navigate(screenName)
  }

  return (
    <View style={styles.menubar}>
      <TouchableOpacity style={styles.icon} onPress={() => goToScreen('Menu')}>
        <Image source={require('./../../assets/img/exersise.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => goToScreen('Food')}>
        <Image source={require('./../../assets/img/food.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => goToScreen('Report')}>
        <Image source={require('./../../assets/img/report.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => goToScreen('Profile')}>
        <Image source={require('./../../assets/img/profile.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    alignItems: 'center'
  },
  buttonIcon: {
    height: '80%',
    width: '80%',
    borderRadius: 25
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
    alignItems: 'center'
  }
})

export default MenuBar
