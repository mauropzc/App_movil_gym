/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'

const SelectFood = ({
  foodsByCategory,
  foodDiary,
  selectNewFood
}) => {
  const [selectedValue, setSelectedValue] = useState(0)

  useEffect(() => {
    setSelectedValue(foodDiary ? foodDiary.idfood : 0)
  }, [foodDiary])

  const handleSelectNewFood = (idfood) => {
    selectNewFood(idfood, foodDiary)
    setSelectedValue(idfood)
  }

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <>
          <RadioButton.Group onValueChange={value => handleSelectNewFood(value)} value={selectedValue}>
            {foodsByCategory.map((food) => (
              <View key={food.id} style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: '2%' }}>
                <TouchableOpacity style={styles.recipe} onPress={() => handleSelectNewFood(food.id)}>
                  <Text style={styles.recipeTitle}>{food.name}</Text>
                  {food.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredients}>{ingredient.name}</Text>
                  ))}
                </TouchableOpacity>
                <RadioButton
                  value={food.id}
                  color='#268de8'
                />
              </View>
            ))}
          </RadioButton.Group>
        </>
      </ScrollView>
    </>
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

export default SelectFood
