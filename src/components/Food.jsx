import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import MenuBar from './MenuBar'
import RNPickerSelect from 'react-native-picker-select'
import { RadioButton } from 'react-native-paper'
import ProgressCircle from 'react-native-progress-circle'
import { useNavigation } from '@react-navigation/native'

const Food = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={[styles.title, { textDecorationLine: 'underline' }]}>RECIPES</Text>
      </View>
      <View style={{ height: '30%', width: '100%' }}>
        <Swiper
          style={{ marginTop: '2%' }}
          loop={false}
          autoplay
          showsPagination
        >
          <Image source={require('./../../assets/img/Receta1.jpg')} style={{ flex: 1, width: '100%' }} />
          <Image source={require('./../../assets/img/Receta2.jpg')} style={{ flex: 1, width: '100%' }} />
        </Swiper>
      </View>

      <Text style={[styles.title, { marginTop: '2%' }]}>DAILY FOOD</Text>

      <View style={styles.body}>
        <View style={styles.dates}>
          <Text style={[styles.text]}>Proteins</Text>
          <Text style={[styles.text]}>Carbs</Text>
          <Text style={[styles.text]}>Fats</Text>
        </View>
        <View style={[styles.dates, { textAlign: 'flex-end' }]}>
          <Text style={[styles.text, { textAlign: 'right' }]}>10/10 g</Text>
          <Text style={[styles.text, { textAlign: 'right' }]}>10/10 g</Text>
          <Text style={[styles.text, { textAlign: 'right' }]}>10/10 g</Text>
        </View>
        <View style={styles.ProgressCircle}>
          <ProgressCircle
            percent={9}
            radius={50}
            borderWidth={7}
            color='#3399FF'
            shadowColor='#999'
            bgColor='#fff'
          >
            <Text style={{ fontSize: 15 }}>10/10</Text>
          </ProgressCircle>
        </View>
      </View>

      <RNPickerSelect
        items={[
          { label: 'Lunch', value: 'lunch' },
          { label: 'Dinner', value: 'dinner' }
        ]}
        style={styles.pickerSelect}
        placeholder={{ label: 'Brekfast', value: 'breakfast' }}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <Image
            source={require('./../../assets/img/flecha.png')}
            style={{ width: 20, height: 20, alignSelf: 'flex-start' }}
          />
        )}
      />

      <ScrollView style={styles.scrollView}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: '2%' }}>
            <TouchableOpacity style={styles.recipe}>
              <Text style={styles.recipeTitle}>Recipe 1</Text>
              <Text style={styles.ingredients}>Chese</Text>
            </TouchableOpacity>
            <RadioButton
              value='recipe'
              status='checked'
              color='#268de8'
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <View style={{ width: '100%', height: '11%' }} />
      <MenuBar navigation={navigate} />
    </View>
  )
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
    justifyContent: 'center'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#268de8'
  },

  body: {
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '3%'
  },

  ProgressCircle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00FF0000',
    padding: '3%'
  },

  text: {
    marginBottom: '5%',
    paddingRight: 0,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    textAlign: 'left'
  },

  dates: {
    flex: 1,
    width: '100%',
    height: '33%',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  meta: {
    top: '150%',
    alignSelf: 'center'
  },

  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#3399FF',
    paddingBottom: '2%'
  },

  ingredients: {
    fontSize: 19,
    paddingBottom: '1%'
  },

  scrollView: {
    marginTop: '3%',
    marginLeft: '5%'
  },

  recipe: {
    width: '85%',
    borderColor: 'gray',
    borderBottomWidth: 0.5
  },

  pickerSelect: {
    inputAndroid: {
      fontSize: 25,
      width: '50%',
      left: 10,
      fontWeight: 'bold',
      color: '#268de8',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: 'gray'
    },
    placeholder: {
      color: '#268de8'
    },
    iconContainer: {
      top: '25%',
      right: '53%'
    }
  },

  button: {
    width: '20%',
    backgroundColor: '#268de8',
    height: '4%',
    marginHorizontal: 15,
    marginTop: '1%',
    alignSelf: 'flex-end',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff'
  }

})
export default Food
