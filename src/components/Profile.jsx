//Edit
import React, {useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

  const { navigate } = useNavigation();
  
  const [userName, setUserName] = useState('Pepito Perez'); // Replace with actual user name logic

  const onPress2 = () => {
   
   };

  const onPressProfile = () => {
    navigate ('EditProfile')
  };


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./../../assets/img/logo_azul (1).png')}></Image>
      <View style={styles.overlay}><Text style={styles.overlayText}>{userName}</Text></View>
      <View style={styles.bar}>
        <TouchableOpacity style={styles.iconBar } onPress={onPress2}>
          <Image source={require('./../../assets/img/config.png')} style={styles.buttonIconBar} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBar } onPress={onPress2}>
          <Image source={require('./../../assets/img/notifications.png')} style={styles.buttonIconBar} />
        </TouchableOpacity>
        <Text style={{width: '60%'}}></Text>
        <TouchableOpacity style={styles.iconBar } onPress={onPressProfile}>
          <Image source={require('./../../assets/img/pencil.png')} style={styles.buttonIconBar} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/user.png')} style={{height: 45, width:45}} />
          <Text style={[styles.text, {fontWeight:'bold'}]}>User Name: </Text>
          <Text style={[styles.text,{paddingLeft:0,}]}>{userName}</Text>
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/email.png')} style={{height: 45, width:45}} />
          <Text style={[styles.text, {fontWeight:'bold'}]}>Email:</Text>
          <Text style={[styles.text,{paddingLeft:0,}]}>user@example.com</Text> 
        </View>
        <View style={styles.dates}>
          <Image source={require('./../../assets/img/key.png')} style={{height: 45, width:45}} />
          <Text style={[styles.text, {fontWeight:'bold'}]}>Password</Text>
          <Text style={[styles.text,{paddingLeft:0,}]}>***********</Text>
        </View>
      </View>
      
      <View style={styles.menubar}>
        <TouchableOpacity style={styles.icon } onPress={onPress2}>
            <Image source={require('./../../assets/img/exersise.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon } onPress={onPress2}>
            <Image source={require('./../../assets/img/food.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon } onPress={onPress2}>
            <Image source={require('./../../assets/img/report.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon } onPress={onPress2}>
            <Image source={require('./../../assets/img/profile.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column'
  },

  logo: {
    width: '100%',
    height: '30%',
  },

  body: {
    width: '100%',
    height: '40%',
    flexDirection: 'column',
    borderWidth: 0.5,
    alignItems: 'center',
  },

  text: {
    paddingRight: 0,
    paddingLeft: 30,
    textAlign: 'left',
    width: 150,
  },

  dates: {
    flex: 1,
    height:'33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    flex: 1,
    alignItems: 'center',
  },

  iconBar: {
    flex: 1,
    alignItems: 'center',
  },

  buttonIcon:{
    height: '80%',
    width:'80%',
    borderRadius: 25,
  },

 buttonIconBar:{
    height: '40%',
    width: '60%',
 },

  buttonImage:{
    height: '100%',
    width:'100%',
    borderRadius: 25,
  },
  
  bar: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
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
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height:'28%',
  },
  overlayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

});

export default Profile;