/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ProgressCircle from 'react-native-progress-circle'
import useGlobalContext from '../hooks/useGlobalContext'

const DailyFood = ({ foodsDiary }) => {
  const { infoNutricionalUser } = useGlobalContext()

  const totalProteins = foodsDiary.reduce((acc, food) => acc + food.food.proteins, 0)
  const totalCarbs = foodsDiary.reduce((acc, food) => acc + food.food.carbs, 0)
  const totalFats = foodsDiary.reduce((acc, food) => acc + food.food.fats, 0)
  const totalCalories = foodsDiary.reduce((acc, food) => acc + food.food.calories, 0)

  const percent = (totalCalories * 100) / infoNutricionalUser.calories

  return (
    <View style={styles.body}>
      <View style={styles.dates}>
        <Text style={[styles.text]}>Proteins</Text>
        <Text style={[styles.text]}>Carbs</Text>
        <Text style={[styles.text]}>Fats</Text>
      </View>
      <View style={[styles.dates, { textAlign: 'flex-end' }]}>
        <Text style={[styles.text, { textAlign: 'right' }]}>{totalProteins}/{infoNutricionalUser.proteins} g</Text>
        <Text style={[styles.text, { textAlign: 'right' }]}>{totalCarbs}/{infoNutricionalUser.carbs} g</Text>
        <Text style={[styles.text, { textAlign: 'right' }]}>{totalFats}/{infoNutricionalUser.fats} g</Text>
      </View>
      <View style={styles.ProgressCircle}>
        <ProgressCircle
          percent={percent}
          radius={50}
          borderWidth={7}
          color={percent > 100 ? 'red' : '#3399FF'}
          shadowColor='#999'
          bgColor='#fff'
        >
          <Text style={{ fontSize: 15 }}>
            {totalCalories}/{infoNutricionalUser.calories} g
          </Text>
        </ProgressCircle>
      </View>
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

export default DailyFood
