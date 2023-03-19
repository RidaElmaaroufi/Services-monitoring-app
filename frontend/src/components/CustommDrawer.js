import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import  {DrawerContentScrollView , DrawerItemList} from '@react-navigation/drawer';
import axios from 'axios';
import host from '../components/Host';
const CustommDrawer = (props) => {
  const navigation = useNavigation('');
  const onPressLogout =() =>{
    axios.get("http://"+host+":3000/logout")
      .then((response) =>{
        if(response.data === 'ok'){
          localStorage.setItem('isLoggedIn', JSON.stringify(false));
          navigation.navigate("Logout", {logout: true});
          console.log(JSON.parse(localStorage.getItem('isLoggedIn')));
        }
      })
  } 
  return (
    <View style= {{flex: 1}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: "#DDE7EC"}}>
        <ImageBackground source={require('../../assets/profileBg.jpg')} style= {{padding: 20}}>
          <Image 
            source={require('../../assets/avatar.png')}
            style= {{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text style= {{color: "#fff", fontSize: 18 }}>{localStorage.name} {localStorage.prenom}</Text>
        </ImageBackground>
        <View style= {{flex: 1, paddingTop: 20}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity onPress={() => onPressLogout() } style= {{paddingVertical: 15}}>
        <View style= {{flexDirection: 'row',alignItems: 'center',padding: 20, borderTopColor:'#ccc', borderTopWidth:2}}>
          <Ionicons name= "exit-outline" size={22} />
          <Text> Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default CustommDrawer