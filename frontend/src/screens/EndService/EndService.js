import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, ActivityIndicator, TextInput, Text, Platform, View, TouchableOpacity, Alert, ToastAndroid, Image, Button, ScrollView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as ImagePicker from 'expo-image-picker';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import Constants from 'expo-constants';

import axios from "axios";

import host from '../../components/Host';

const EndService = () => {
  // swithc for relief driver
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () =>{
    setIsEnabled(isEnabled => !isEnabled);
    if(isEnabled) SetIdSecond('end');
    else SetIdSecond('');
  } 
  const [IdSecond, SetIdSecond] = useState('');
  const [Sum, SetSum] = useState('');
  const [Lack, SetLack] = useState('');
  const [Imge, SetImge] = useState(null);
  const [animating, setAnimating] = useState(false);
  const navigation = useNavigation(''); 

  const [visible, setVisible] = useState(false);
  const [ErrMsg, setErrMsg] = useState('');


  const toggleAlert2 = (() => {
    setVisible(false);
  });

  useEffect (() => {
    async function getPermission(){
      if(Platform.OS !== 'web'){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
          alert('Permission denied');
        }
      }
    }
    getPermission();
  }, [])
  const PickImage = async() =>{
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,5],
      quality: 1
    })    
    console.log(result);
    if(!result.cancelled){
      SetImge(result.uri)
    }
  } 
  const onPressValidate= () =>{  
    setAnimating(true);  
    const getData = async () => {
        await axios.post("http://"+host+":3000/EndService",{secondDriver: IdSecond, sum: Sum, lack: Lack, image: Imge} )
          .then((response)=>{
            if(response.data.result){
              setAnimating(false);
              Alert.alert("Success",`${response.data.message}`);
              ToastAndroid.showWithGravity(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.TOP
              )
              SetIdSecond('');
              SetSum('');
              SetLack('');
              SetImge(null);
              navigation.navigate('Home');
            }else {
              setAnimating(false);
              if(response.data.refresh){
                SetIdSecond('');
                SetSum('');
                SetLack('');
                SetImge(null);
              }
              setErrMsg(response.data.message);
              setVisible(true);
            }
          }); 
    };
    getData();
  }

  const CancelHandle = () =>{
    navigation.navigate('Home');
    SetIdSecond('');
    SetSum('');
    SetLack('');
    SetImge(null);
    setAnimating(false);


  }
  return (
    <SafeAreaView style={styles.container1}>
      <TouchableOpacity>
        <Image 
            source={require('../../../assets/download.png')}
            resizeMode="contain"
            style={styles.logo}
        />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
            animating = {animating}
            color = 'green'
            size = "large"
            style = {styles.activityIndicator}
        />
        <Text style={styles.welcome}>
              End Service
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
        <View style={styles.secondReliefContainer}>
          <TextInput
            style={styles.input}
            onChangeText={SetIdSecond}
            placeholder="relief driver"
            keyboardType="numeric"
            value={IdSecond}
            editable= {isEnabled}
          />
          <Switch
            trackColor={{ false: "gray", true: "green"}}       
            thumbColor={ isEnabled ? 'green': '#f4f3f4'}
            ios_backgroundColor = 'gray'
            onValueChange={toggleSwitch}
            value={isEnabled}
            style= {{ marginTop: '11%'}}
          />
        </View>
        
        <TextInput
          style={styles.input}
          onChangeText={SetSum}
          value={Sum}
          placeholder="DHs"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={SetLack}
          value={Lack}
          placeholder="Lack"
          keyboardType="numeric"
        />
        <View style={{margin: 10}}>
          {Imge && <Image source={{uri:Imge}} style = {{width: 200, height: 50, margin: 5}} resizeMode="contain"/>}
          <Button title='Take Image' onPress={()=>PickImage()}/> 
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn2}>
            <Text style={styles.btnText} onPress={()=> CancelHandle()}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn1}>
            <Text style={styles.btnText} onPress={()=>onPressValidate()}>Validate</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F9FBFC"
    
  },
  secondReliefContainer: {
    width: 250,
    flexDirection: 'row'
  },

  welcome: {
    fontSize: 40,
    fontFamily: 'monospace'
  },
  container: {
    
    backgroundColor: "#49b7d2",
    paddingTop: 20,
    marginTop: -50,
    height: 550,
    alignItems: 'center',
    justifycontent: 'center',
    borderRadius: 10,
  },
  logo: {
    marginTop: "-20%"
  },
  input: {
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

export default EndService;