import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import MenuBar from './MenuBar';
import useGlobalContext from './hooks/useGlobalContext';
import RNPickerSelect from 'react-native-picker-select';
import { RadioButton } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle'

const foods = [
    {  
      name: 'recipe1',
      ingredients: ['Eggs', 'Banana', 'Cheese'], 
      proteins: 25,
      carbs: 20,
      fats: 16,
      calories: 325,
      catFood: 'breakfast'
    },

    { 
      name: 'recipe2',
      ingredients: ['Pancakes', 'Strawberries', 'Oatmeal'], 
      proteins: 32,
      carbs: 28,
      fats: 30,
      calories: 510,
      catFood: 'breakfast'
    },
    
    
    { 
      name: 'recipe3',
      ingredients: ['Cereal', 'Milk', 'Blueberries'], 
      proteins: 56,
      carbs: 54,
      fats: 50,
      calories: 890,
      catFood: 'breakfast'
    },

  
    {  
      name: 'recipe1',
      ingredients: ['Pasta', 'Tomato', 'Meat'], 
      proteins: 29,
      carbs: 24,
      fats: 18,
      calories: 374,
      catFood: 'lunch'
    },

    {  
      name: 'recipe2',
      ingredients: ['Chickpeas', 'Spinach', 'Chicken Breast'], 
      proteins: 43,
      carbs: 40,
      fats: 38,
      calories: 674,
      catFood: 'lunch'
    },
    
    {  
      name: 'recipe3',
      ingredients: ['Lentils', 'Avocado', 'Cherry Tomato'], 
      proteins: 69,
      carbs: 66,
      fats: 64,
      calories: 1116,
      catFood: 'lunch'
    },
  
    { 
      name: 'recipe1', 
      ingredients: ['Rice', 'Broccoli', 'Cucumber'], 
      proteins: 18,
      carbs: 22,
      fats: 16,
      calories: 303,
      catFood: 'dinner'
    },

    {  
      name: 'recipe2',
      ingredients: ['Asparagus', 'Fish', 'Chard'], 
      proteins: 40,
      carbs: 55,
      fats: 49,
      calories: 821,
      catFood: 'dinner'
    },
    
    { 
      name: 'recipe3',
      ingredients: ['Corn Pie', 'Mushrooms', 'Pork Steak'], 
      proteins: 61,
      carbs: 62,
      fats: 56,
      calories: 996,
      catFood: 'dinner'
    },
];


const Food = () => {
    const { navigate } = useNavigation();

    const { valorCalories, 
            comidas, setComidas, 
            progress, setProgress, 
            usuarioActual, setUsuarioActual, 
            usuarios, setUsuarios} = useGlobalContext();

    const swiperRef = useRef(null);

    const [tipoComida, setTipoComida] = useState('breakfast');

    const [number, setNumber] = useState(null);

    const [actualFood, setActualFood] = useState(foods.filter(food => food.catFood === 'breakfast'));
    const [breakfast, setBreakfast] = useState(null);
    const [lunch, setLunch] = useState(null);
    const [dinner, setDinner] = useState(null);
  
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleSelection = (recipeName, index) => {
      if (selectedRecipe === recipeName) {
        setNumber(null)
        setSelectedRecipe(null); // Deselecciona la receta si ya está seleccionada
      } else {
        setNumber(index)
        setSelectedRecipe(recipeName); // Selecciona la receta
      }
    };

    function asignFood () {
      switch (tipoComida) {
        case 'breakfast':
          setActualFood(foods.filter(food => food.catFood === 'breakfast'))
          console.log(foods.filter(food => food.catFood === 'breakfast'))
          break;
        case 'lunch':
          setActualFood(foods.filter(food => food.catFood === 'lunch'))
          break;
        case 'dinner':
          setActualFood(foods.filter(food => food.catFood === 'dinner'))
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
      let aux;
      let mealIns;
      const foodDef = { proteins: 0, carbs: 0, fats: 0, calories: 0 };
    
      switch (tipoComida) {
        case 'breakfast':
          aux = breakfast != null ? breakfast : foodDef;
          mealIns = actualFood[num]|| foodDef;
          setComidas(prevComidas => ({
            ...prevComidas,
            breakfast: mealIns
          }));
          setBreakfast(mealIns);
          break;
        case 'lunch':
          aux = lunch != null ? lunch : foodDef;
          mealIns = actualFood[num] || foodDef;
          setComidas(prevComidas => ({
            ...prevComidas,
            lunch: mealIns
          }));
          setLunch(mealIns);
          break;
        case 'dinner':
          aux = dinner != null ? dinner : foodDef;
          mealIns = actualFood[num] || foodDef;
          setComidas(prevComidas => ({
            ...prevComidas,
            dinner: mealIns
          }));
          setDinner(mealIns);
          break;
        default:
          break;
      }
    
      const newProgress = {
        proteins: progress.proteins - aux.proteins + mealIns.proteins,
        carbs: progress.carbs - aux.carbs + mealIns.carbs,
        fats: progress.fats - aux.fats + mealIns.fats,
        calories: progress.calories - aux.calories + mealIns.calories,
        progress: progress.progress - (aux.calories / valorCalories[0] * 100) + (mealIns.calories / valorCalories[0] * 100)
      };
      guardarCambios(newProgress)
    
      setProgress(newProgress);
    };
    
    useEffect(() => {
      console.log(comidas);
    }, [comidas]);

    const guardarCambios = async (progress) => {
      if (usuarioActual) {
        // Crear una copia del arreglo de usuarios
        const nuevosUsuarios = [...usuarios];
        const index = nuevosUsuarios.findIndex(u => u.username === usuarioActual.username);
        if (index !== -1) {
            nuevosUsuarios[index].progreso = progress;
            await setUsuarios(nuevosUsuarios);
            setUsuarioActual(usuarios.find(user => user.username === usuarioActual.username));
            console.log('aquí estan mis nuevos usuarios ',usuarios)
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
              <View style={styles.ProgressCircle}>
                <ProgressCircle
                  percent={progress.progress}
                  radius={50}
                  borderWidth={7}
                  color={progress.progress > 100 ? 'red' : '#3399FF'}
                  shadowColor="#999"
                  bgColor="#fff"
                >
                    <Text style={{ fontSize: 15 }}>{progress.calories}/{valorCalories[0]}</Text>
                </ProgressCircle>
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
          <>
            {actualFood.map((recipe, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: index === 0 ? 0 : '2%' }}>
                <TouchableOpacity style={styles.recipe} onPress={() => handleSelection(`recipe${index + 1}`, index)}>
                  <Text style={styles.recipeTitle}>Recipe {index + 1}</Text>
                  <Text style={styles.ingredients}>{recipe.ingredients[0]}</Text>
                  <Text style={styles.ingredients}>{recipe.ingredients[1]}</Text>
                  <Text style={styles.ingredients}>{recipe.ingredients[2]}</Text>
                </TouchableOpacity>
                <RadioButton
                  value={`recipe${index + 1}`}
                  status={selectedRecipe === `recipe${index + 1}` ? 'checked' : 'unchecked'}
                  onPress={() => {setNumber(index); handleSelection(`recipe${index + 1}`, index)}}
                  color='#268de8'
                />
              </View>
            ))}
          </>
          </ScrollView>
          < TouchableOpacity   style={styles.button} onPress={() => {selectRecipe(number)}} >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
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
        paddingVertical: 4,
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

    button: {
      width: '20%',
      backgroundColor: '#268de8',
      height: '4%',
      marginHorizontal: 15,
      marginTop: '1%',
      alignSelf: 'flex-end',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonText: {
      fontWeight: 'bold',
      fontSize: 15,
      color: '#fff',
    },

})
export default Food;