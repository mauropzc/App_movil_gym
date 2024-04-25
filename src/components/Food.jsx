import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import MenuBar from './MenuBar'
import RNPickerSelect from 'react-native-picker-select'
import { useNavigation } from '@react-navigation/native'
import useGlobalContext from '../hooks/useGlobalContext'
import axios from 'axios'
import { API_URL } from '@env'
import SelectFood from './SelectFood'
import DailyFood from './DailyFood'

const options = [
  { label: 'Breakfast', value: 1 },
  { label: 'Lunch', value: 2 },
  { label: 'Dinner', value: 3 }
]

const Food = () => {
  const { navigate } = useNavigation()
  const { usuarioActual } = useGlobalContext()
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCatFood, setSelectedCatFood] = useState(1)
  const [foodsByCategory, setFoodsByCategory] = useState([])
  const [foodsDiary, setFoodsDiary] = useState([])
  const [foodDiaryByCatFood, setFoodDiaryByCatFood] = useState(null)

  useEffect(() => {
    getFoods()
  }, [])

  const getFoods = async () => {
    setLoading(true)
    try {
      const dataFoods = await axios.get(`${API_URL}/foods`)
      setFoods(dataFoods.data)
      const foodsFiltered = dataFoods.data.filter((food) => food.idcatfood === selectedCatFood)

      const dataFoodsDiaries = await axios.get(`${API_URL}/foodDiaries/today/${usuarioActual.id}`)
      setFoodsDiary([...dataFoodsDiaries.data])
      setFoodsByCategory(foodsFiltered)
      setFoodDiaryByCatFood(dataFoodsDiaries.data.find((food) => food.food.idcatfood === selectedCatFood))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOnChangeCategory = (idcatfood) => {
    const foodsFiltered = foods.filter((food) => food.idcatfood === idcatfood)
    setFoodsByCategory(foodsFiltered)
    setSelectedCatFood(idcatfood)
    setFoodDiaryByCatFood(foodsDiary.find((food) => food.food.idcatfood === idcatfood))
  }

  const selectNewFood = (idfood, foodDiary) => {
    const auxFood = foods.find((food) => food.id === idfood)
    if (foodDiary) {
      const auxFoodDiaryTemp = foodsDiary.map((food) => {
        if (food.id === foodDiary.id) {
          food.food = auxFood
          food.idfood = idfood
        }
        return food
      })
      setFoodsDiary(auxFoodDiaryTemp)
      updateFoodDiary(foodDiary, idfood)
    } else {
      registerFoodDiary(idfood)
    }
  }

  const registerFoodDiary = async (selectedFood) => {
    try {
      const response = await axios.post(`${API_URL}/foodDiaries`, {
        iduser: usuarioActual.id,
        idfood: selectedFood
      })

      const newReg = response.data
      newReg.food = foods.find((food) => food.id === selectedFood)
      setFoodsDiary([...foodsDiary, newReg])
    } catch (error) {
      console.log(error)
    }
  }

  const updateFoodDiary = async (currentFood, selectedFood) => {
    try {
      await axios.put(`${API_URL}/foodDiaries/${currentFood.id}`, {
        iduser: usuarioActual.id,
        idfood: selectedFood
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

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

      <DailyFood
        foodsDiary={foodsDiary}
      />

      <RNPickerSelect
        items={options}
        value={selectedCatFood}
        onValueChange={(value) => handleOnChangeCategory(value)}
        on
        style={styles.pickerSelect}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <Image
            source={require('./../../assets/img/flecha.png')}
            style={{ width: 20, height: 20, alignSelf: 'flex-start' }}
          />
        )}
      />

      <SelectFood
        foodsByCategory={foodsByCategory}
        foodDiary={foodDiaryByCatFood}
        selectNewFood={selectNewFood}
      />

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
