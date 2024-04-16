import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Svg, { Circle, G } from 'react-native-svg';
import MenuBar from './MenuBar';
import useGlobalContext from './hooks/useGlobalContext';
import RNPickerSelect from 'react-native-picker-select';
import { RadioButton } from 'react-native-paper';

const ProgressCircle = ({ progress, size, strokeWidth, valorCalories }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressStrokeDashoffset = circumference - (progress.progress / 100) * circumference;


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
          {/* Texto dentro del círculo */}
          <Text style = {styles.meta}  fontSize={12} fill="black">
            {progress.calories}/{valorCalories[0]}
          </Text>
        </G>
      </Svg>
    </View>
  );
};

const Recipes = {
  breakfast: {
    recipe1: ['Eggs', 'Banana', 'Cheese'],
    recipe2: ['Pancakes', 'Strawberries', 'Oatmeal'],
    recipe3: ['Cereal', 'Milk', 'Blueberries'],
    proteins: [25, 32, 56],
    carbs: [20, 28, 54],
    fats: [16, 30, 50],
    calories: [325, 510, 890]
  },
  lunch: {
    recipe1: ['Pasta', 'Tomato', 'Meat'],
    recipe2: ['Chickpeas', 'Spinach', 'Chicken Breast'],
    recipe3: ['Lentils', 'Avocado', 'Cherry Tomato'],
    proteins: [29, 43, 69],
    carbs: [24, 40, 66],
    fats: [18, 38, 64],
    calories: [374, 674, 1116]
  },
  dinner: {
    recipe1: ['Rice', 'Broccoli', 'Cucumber'],
    recipe2: ['Asparagus', 'Fish', 'Chard'],
    recipe3: ['Corn Pie', 'Mushrooms', 'Pork Steak'],
    proteins: [18, 40, 61],
    carbs: [22, 55, 62],
    fats: [16, 49, 56],
    calories: [303, 821, 996]
  }
};


const Food = () => {
    const { navigate } = useNavigation();

    const { valorCalories, comidas, setComidas, progress, setProgress, usuarioActual } = useGlobalContext();

    const swiperRef = useRef(null);

    const [tipoComida, setTipoComida] = useState('breakfast');
  
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    const [actualFood, setActualFood] = useState(Recipes.breakfast);
    const [breakfast, setBreakfast] = useState(null);
    const [lunch, setLunch] = useState(null);
    const [dinner, setDinner] = useState(null);

    const handleSeleccion = (opcion) => {
      setOpcionSeleccionada(opcion);
    };

    function asignFood () {
      switch (tipoComida) {
        case 'breakfast':
          setActualFood(Recipes.breakfast,)
          break;
        case 'lunch':
          setActualFood(Recipes.lunch)
          break;
        case 'dinner':
          setActualFood(Recipes.dinner)
          break;
        default:
          break;
     }
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

    function calcularNutricion(usuario) {
      if (usuario != null) {
        meta = usuario.meta
        switch (meta) {
          case 'Lose_Fat':
           return {proteins:[Recipes.breakfast.proteins[0], Recipes.lunch.proteins[0], Recipes.dinner.proteins[0]],
                    carbs:[Recipes.breakfast.carbs[0], Recipes.lunch.carbs[0], Recipes.dinner.carbs[0]],
                    fats:[Recipes.breakfast.fats[0], Recipes.lunch.fats[0], Recipes.dinner.fats[0]],
                    calories:[Recipes.breakfast.calories[0], Recipes.lunch.calories[0], Recipes.dinner.calories[0]]};            
          case 'Keep_Fat':
            return {proteins:[Recipes.breakfast.proteins[1], Recipes.lunch.proteins[1], Recipes.dinner.proteins[1]],
                    carbs:[Recipes.breakfast.carbs[1], Recipes.lunch.carbs[1], Recipes.dinner.carbs[1]],
                    fats:[Recipes.breakfast.fats[1], Recipes.lunch.fats[1], Recipes.dinner.fats[1]],
                    calories:[Recipes.breakfast.calories[1], Recipes.lunch.calories[1], Recipes.dinner.calories[1]]}; 
          case 'Gain_Fat':
            return {proteins:[Recipes.breakfast.proteins[2], Recipes.lunch.proteins[2], Recipes.dinner.proteins[2]],
                    carbs:[Recipes.breakfast.carbs[2], Recipes.lunch.carbs[2], Recipes.dinner.carbs[2]],
                    fats:[Recipes.breakfast.fats[2], Recipes.lunch.fats[2], Recipes.dinner.fats[2]],
                    calories:[Recipes.breakfast.calories[2], Recipes.lunch.calories[2], Recipes.dinner.calories[2]]};
          default:
            return 0;
        }
      }
    };

    function selectRecipe(num) {
      nut = calcularNutricion(usuarioActual)
      console.log('Si pasé')
      switch (tipoComida) {
        case 'breakfast':
          setComidas(prevComidas => ({
            ...prevComidas,
            breakfast: {
              ingredients: Object.values(Recipes.breakfast)[num],
              nutricion: [nut.proteins[0], nut.carbs[0], nut.fats[0], nut.calories[0]]
            }
          }));
          if (comidas.breakfast.ingredients === null) {
            setProgress( {proteins: progress.proteins + nut.proteins[0], 
                          carbs: progress.carbs + nut.carbs[0],
                          fats: progress.fats + nut.fats[0],
                          calories: progress.calories + nut.calories[0],
                          progress: progress.progress + (nut.calories[0]/valorCalories[0]*100)})
                          console.log('aqui fui tambien')
            };
          break;
        case 'lunch':
          setComidas(prevComidas => ({
            ...prevComidas,
            lunch: {
              ingredients: Object.values(Recipes.lunch)[num],
              nutricion: [nut.proteins[1], nut.carbs[1], nut.fats[1], nut.calories[1]]
            }
          }));
          if (comidas.lunch.ingredients === null) {
            setProgress( {proteins: progress.proteins + nut.proteins[1], 
                          carbs: progress.carbs + nut.carbs[1],
                          fats: progress.fats + nut.fats[1],
                          calories: progress.calories + nut.calories[1],
                          progress: progress.progress + (nut.calories[1]/valorCalories[0]*100)})
          };
          break;
        case 'dinner':
          setComidas(prevComidas => ({
            ...prevComidas,
            dinner: {
              ingredients: Object.values(Recipes.dinner)[num],
              nutricion: [nut.proteins[2], nut.carbs[2], nut.fats[2], nut.calories[2]]
            }
          }));
          if (comidas.dinner.ingredients === null) {
            setProgress( {proteins: progress.proteins + nut.proteins[2], 
                          carbs: progress.carbs + nut.carbs[2],
                          fats: progress.fats + nut.fats[2],
                          calories: progress.calories + nut.calories[2],
                          progress: progress.progress + (nut.calories[2]/valorCalories[0]*100)})
          };
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      console.log(comidas);
    }, [comidas]);

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
                <Text style={[styles.text,{textAlign: 'right'}]}>{progress.proteins}/{valorCalories[1]} g</Text>
                <Text style={[styles.text,{textAlign: 'right'}]}>{progress.carbs}/{valorCalories[2]} g</Text>
                <Text style={[styles.text,{textAlign: 'right'}]}>{progress.fats}/{valorCalories[3]} g</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#00FF0000' }}>
              {/* Usando el componente ProgressCircle */}
                  <ProgressCircle progress={progress} size={80} strokeWidth={5} backgroundColor="black" valorCalories={valorCalories} />
             </View>
          </View>

          <RNPickerSelect
            items={[
              { label: 'Lunch', value: 'lunch' },
              { label: 'Dinner', value: 'dinner' },
            ]}
            onValueChange={(value) => {
              setTipoComida(value);
              asignFood();
            }}
            value={tipoComida}
            style={styles.pickerSelect}
            placeholder={{label: 'Brekfast', value: 'breakfast'}}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <Image
                source={require('./../../assets/img/flecha.png')}
                style={{ width: 20, height: 20, alignSelf: 'flex-start'}}
              />
            )}
          />

          <ScrollView style={styles.scrollView}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <TouchableOpacity style={styles.recipe} onPress={() => {handleSeleccion('recipe1'); selectRecipe(0)}}>
                <Text style={styles.recipeTitle}>Recipe 1</Text>
                <Text style={styles.ingredients}>{actualFood.recipe1[0]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe1[1]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe1[2]}</Text>
              </TouchableOpacity>
              <RadioButton
                value="recipe1"
                status={opcionSeleccionada === 'recipe1' ? 'checked' : 'unchecked'}
                onPress={() => {handleSeleccion('recipe1'); selectRecipe(0)}}
                color='#268de8'
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop:'2%' }}>
              <TouchableOpacity style={styles.recipe} onPress={() => {handleSeleccion('recipe2'); selectRecipe(1)}}>
                <Text style={styles.recipeTitle}>Recipe 2</Text>
                <Text style={styles.ingredients}>{actualFood.recipe2[0]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe2[1]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe2[2]}</Text>
              </TouchableOpacity>
              <RadioButton
                value="recipe2"
                status={opcionSeleccionada === 'recipe2' ? 'checked' : 'unchecked'}
                onPress={() => {handleSeleccion('recipe2'); selectRecipe(1)}}
                color='#268de8'
              />
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop:'2%'}}>
              <TouchableOpacity style={styles.recipe} onPress={() => {handleSeleccion('recipe3'); selectRecipe(2)}}>
                <Text style={styles.recipeTitle}>Recipe 3</Text>
                <Text style={styles.ingredients}>{actualFood.recipe3[0]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe3[1]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe3[2]}</Text>
              </TouchableOpacity>
              <RadioButton
                value="recipe3"
                status={opcionSeleccionada === 'recipe3' ? 'checked' : 'unchecked'}
                onPress={() => {handleSeleccion('recipe3'); selectRecipe(2)}}
                color='#268de8'
              />
            </View>
          </ScrollView>
          <View style={{width: '100%', height: '11%',}}></View>
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

    meta: {
      top: '150%',
      alignSelf: 'center',  
    },

    recipeTitle: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#676665',
      paddingBottom: '2%'
    },

    ingredients: {
      fontSize: 20,
      paddingBottom: '1%'
    },

    scrollView: {
      marginTop: '3%',
      marginLeft: '5%',
    },

    recipe: {
      width:'85%',
      borderColor: 'gray',
      borderBottomWidth: 0.5,
    },

    pickerSelect: {
      inputAndroid: {
        fontSize: 25,
        width: '50%',
        left: 10,
        fontWeight: 'bold',
        color:'#268de8',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'gray'
      },
      placeholder: {
        color: '#268de8',
      },
      iconContainer: {
        top: '25%',
        right: '53%',
      },
    },

})
export default Food;