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
    recipe1: {  ingredients: ['Eggs', 'Banana', 'Cheese'], 
                proteins: 25,
                carbs: 20,
                fats: 16,
                calories: 325},

     recipe2: {  ingredients: ['Pancakes', 'Strawberries', 'Oatmeal'], 
                proteins: 32,
                carbs: 28,
                fats: 30,
                calories: 510},
    
     recipe3: {  ingredients: ['Cereal', 'Milk', 'Blueberries'], 
                proteins: 56,
                carbs: 54,
                fats: 50,
                calories: 890},
  },
  lunch: {
    recipe1: {  ingredients: ['Pasta', 'Tomato', 'Meat'], 
                proteins: 29,
                carbs: 24,
                fats: 18,
                calories: 374},

     recipe2: {  ingredients: ['Chickpeas', 'Spinach', 'Chicken Breast'], 
                proteins: 43,
                carbs: 40,
                fats: 38,
                calories: 674},
    
     recipe3: {  ingredients: ['Lentils', 'Avocado', 'Cherry Tomato'], 
                proteins: 69,
                carbs: 66,
                fats: 64,
                calories: 1116},
  },
  dinner: {
    recipe1: {  ingredients: ['Rice', 'Broccoli', 'Cucumber'], 
                proteins: 18,
                carbs: 22,
                fats: 16,
                calories: 303},

     recipe2: {  ingredients: ['Asparagus', 'Fish', 'Chard'], 
                proteins: 40,
                carbs: 55,
                fats: 49,
                calories: 821},
    
     recipe3: {  ingredients: ['Corn Pie', 'Mushrooms', 'Pork Steak'], 
                proteins: 61,
                carbs: 62,
                fats: 56,
                calories: 996},
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
          setActualFood(Recipes.breakfast)
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


    function selectRecipe(num) {
  
      switch (tipoComida) {
        case 'breakfast':
          if (breakfast != null){
            aux = breakfast
          } else {
            aux = {proteins:0, carbs:0, fats:0, calories:0}
          }
          console.log(aux)
          const breakfastIns = Object.values(Recipes.breakfast)[num]
          console.log(breakfast)
          setComidas(prevComidas => ({
            ...prevComidas,
            breakfast: breakfastIns
          }));
          setProgress( {proteins: progress.proteins - aux.proteins + breakfastIns.proteins, 
                        carbs: progress.carbs - aux.carbs + breakfastIns.carbs,
                        fats: progress.fats - aux.fats + breakfastIns.fats,
                        calories: progress.calories - aux.calories + breakfastIns.calories,
                        progress: progress.progress - (aux.calories/valorCalories[0]*100) + (breakfastIns.calories/valorCalories[0]*100)})
          setBreakfast(breakfastIns)
          break;
        case 'lunch':
          if (lunch != null){
            aux = lunch
          } else {
            aux = {proteins:0, carbs:0, fats:0, calories:0}
          }
          console.log(aux)
          const lunchIns = Object.values(Recipes.lunch)[num]
          console.log(lunch)
          setComidas(prevComidas => ({
            ...prevComidas,
            lunch: lunchIns
          }));
          setProgress( {proteins: progress.proteins - aux.proteins + lunchIns.proteins, 
                        carbs: progress.carbs - aux.carbs + lunchIns.carbs,
                        fats: progress.fats - aux.fats + lunchIns.fats,
                        calories: progress.calories - aux.calories + lunchIns.calories,
                        progress: progress.progress - (aux.calories/valorCalories[0]*100) + (lunchIns.calories/valorCalories[0]*100)})
          setLunch(lunchIns)
          break;
        case 'dinner':
          if (dinner != null){
            aux = dinner
          } else {
            aux = {proteins:0, carbs:0, fats:0, calories:0}
          }
          console.log(aux)
          const dinnerIns = Object.values(Recipes.dinner)[num]
          console.log(dinner)
          setComidas(prevComidas => ({
            ...prevComidas,
            dinner: dinnerIns
          }));
          setProgress( {proteins: progress.proteins - aux.proteins + dinnerIns.proteins, 
                        carbs: progress.carbs - aux.carbs + dinnerIns.carbs,
                        fats: progress.fats - aux.fats + dinnerIns.fats,
                        calories: progress.calories - aux.calories + dinnerIns.calories,
                        progress: progress.progress - (aux.calories/valorCalories[0]*100) + (dinnerIns.calories/valorCalories[0]*100)})
          setDinner(dinnerIns)
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      console.log(comidas);
    }, [comidas]);

    const guardarCambios = async () => {
      if (usuarioActual) {
        // Crear una copia del arreglo de usuarios
        const nuevosUsuarios = [...usuarios];
        const index = nuevosUsuarios.findIndex(u => u.username === usuarioActual.username);
        if (index !== -1) {
            nuevosUsuarios[index].progress = progress;
            await setUsuarios(nuevosUsuarios);
            setUsuarioActual(usuarios.find(user => user.username === usuario));
          }
        } else {
          alert('Usuario no encontrado.');
        }
    };
  

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
                <Text style={styles.ingredients}>{actualFood.recipe1.ingredients[0]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe1.ingredients[1]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe1.ingredients[2]}</Text>
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
                <Text style={styles.ingredients}>{actualFood.recipe2.ingredients[0]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe2.ingredients[1]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe2.ingredients[2]}</Text>
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
                <Text style={styles.ingredients}>{actualFood.recipe3.ingredients[0]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe3.ingredients[1]}</Text>
                <Text style={styles.ingredients}>{actualFood.recipe3.ingredients[2]}</Text>
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