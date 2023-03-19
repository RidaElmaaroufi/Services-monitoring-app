import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import SelectList from 'react-native-dropdown-select-list';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import Ionicons from 'react-native-vector-icons/Ionicons';

import host from '../../components/Host';;

const StartService = () => {
  const [ErrMsg, setErrMsg] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleAlert2 = (() => {
    setVisible(false);
  });

  const navigation = useNavigation('');

  // const handleBackPress = ()=>{
  //   console.log('okkkkkk')
  //   navigation.navigate('Home'); 
  //   };
  //   useEffect(()=>{
  //     BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  // }, []);



  const [Ligne, setLigne] = useState('');
  const [vehicule, setVehicule] = useState('');
  const dataLigne = [
    {key: "L019", value: "L019"},
    {key: "L020", value:"L020"},
    {key: "L005", value:"L005"}, 
    {key: "L098", value:"L098"}, 
    {key: "L078", value:"L078"}, 
    {key: "L0143", value:"L0143"}
  ];
  const dataVehicule = [
    {key: "5555", value: "5555"},
    {key: "3333", value: "3333"},
    {key: "6541", value: "6541"},
    {key: "8787", value: "8787"},
    {key: "1919", value: "1919"},
    {key: "2020", value: "2020"}
  ];

  const onPressValidate = () => {
    axios.post("http://"+host+":3000/StartService", {idLigne: Ligne,idVehicule: vehicule })
      .then((response)=>{
        if(response.data.result){
          console.log(response.data.message);
          Alert.alert("Success",`${response.data.message}`);
          setLigne('');
          setVehicule('');
          navigation.navigate('Home');
        }else {
          setErrMsg(response.data.message);
          setVisible(true);
        }
      });
  }
  return (
    <SafeAreaView style={styles.container1}>
      <TouchableOpacity>
        <Image 
            source={require('../../../assets/download-removebg-preview.png')}
            resizeMode="contain"
            style={styles.logo}
        />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>
              Start Service
        </Text>
        <View>
          <FancyAlert
            visible={visible}
            icon={
            <View style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 50,
              width: '100%',
              }}>
                <TouchableOpacity onPress={toggleAlert2}>
                  <Text >❌</Text>
                </TouchableOpacity>
              </View>} 
            style={{ backgroundColor: 'white' }}
          > 
            <Text style={{ marginTop: -16, marginBottom: 32 }}>{ErrMsg}</Text>
          </FancyAlert>
        </View>
        <SelectList placeholder="Ligne" data={dataLigne} setSelected={setLigne} value={Ligne} 
          boxStyles={{
            backgroundColor: "#F9FBFC",
            height: 50,
            width: 260,
            borderRadius: 10,
            marginTop : 30,    
            padding: 10,
          }} 
          dropdownStyles={{
            backgroundColor:"gray",
          }}
          dropdownTextStyles={{
            color:"white",
            fontSize:20
          }}
          maxHeight={100}
        />
        <SelectList data={dataVehicule} setSelected={setVehicule}
          boxStyles={{
            backgroundColor: "#F9FBFC",
            height: 50,
            width: 260,
            borderRadius: 10,
            marginTop : 30,    
            padding: 10,
          }}
          dropdownStyles={{
            backgroundColor:"gray",
          }}
          dropdownTextStyles={{
            color:"white",
            fontSize:20,
          }}
          placeholder=<Text><Ionicons name= "ios-bus-sharp" size={20} color='gray' /> Vehicule</Text>
          maxHeight={100}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn2}>
            <Text style={styles.btnText} onPress={()=> navigation.navigate('Home')}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn1}>
            <Text style={styles.btnText} onPress={()=>onPressValidate()}>Validate</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F9FBFC"
  },
  startService:{
    fontSize : 30,
    color: "#96be25",
    fontFamily: 'monospace'
  },
  welcome: {
    fontSize: 40,
    fontFamily: 'monospace'
  },
  container: {
    backgroundColor: "#3ec8ec",  //"#49b7d2",
    paddingTop: 40,
    marginTop: -50,
    height: 500,
    alignItems: 'center',
    justifycontent: 'center',
    borderRadius: 10,
  },
  logo: {
    marginTop: "-15%"
  },
  input1: {
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop : 30,    
    padding: 10,
    backgroundColor: "#fff"
  },

  input2: {
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop : 30,    
    padding: 10,
    backgroundColor: "#F9FBFC"
  },
  btnContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingBottom: 70,
    marginTop: 50,
    justifyContent: "space-around",
    width: "80%"
  },
  userBtn1:{
    backgroundColor: "#49d2b7",
    padding: 15,
    width: "45%",
    borderRadius : 20
  },
  userBtn2:{
    backgroundColor: "#FFD700",
    padding: 15,
    width: "45%",
    borderRadius : 20
  },
  btnText: {
    fontSize : 18,
    textAlign: "center"
  },
});

export default StartService