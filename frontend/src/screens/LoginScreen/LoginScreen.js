import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, TextInput, Text, Platform, View, TouchableOpacity, Alert, ToastAndroid, Image, BackHandler } from "react-native";
import { useNavigation  } from "@react-navigation/native";
import axios from "axios";
import host from '../../components/Host';

const LoginScreen = () => {
  const handleBackPress = ()=>{
    BackHandler.exitApp();
  };
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  }, [])
  // useEffect(() =>{
  //   axios.get("http://192.168.4.84:3000/users")
  //   .then((response) => {
  //     if(response.data.result){
  //       setSuccess(true);
  //     }
  //   })
  // }, []);

  const errRef = useRef();
  const [text, onChangeText] = useState('');
  const [Password, onChangepassword] = useState('');
  const [errMsg, setErrMsg] = useState(''); 
  const [success, setSuccess] = useState(false);
  const [animating, setAnimating] = useState(false);

 
  const navigation = useNavigation('');
  // if(route.params == false)
  //   setSuccess(false)
  //session's track  
  // useEffect(() =>{
  //   axios.get("http://192.168.4.62:3000/users")
  //   .then((response) => {
  //     if(response.data.result)
  //      setSuccess(true);
  //     else{
  //       setSuccess(false);
  //     } 
  //   });
  // });
  // useEffect(() => {
  //   const getInfo = setTimeout(()=>{
  //     const getData = async () => {
  //       const data = await axios.post("http://192.168.11.104:3001/users"); 
  //       Alert.alert(data.data);
  //     };
  //     getData();
  //   }, 2000);//this will run after 2 seconds
  //   return () => clearTimeout(getInfo);
  // }, []);

  const onPressLogin =() =>{
        setAnimating(true);
        axios.post("http://"+host+":3000/users", {code: text, password: Password})
          .then((response) => {
            if(response.data.result){
              localStorage.name = response.data.message;
              localStorage.prenom = response.data.prenom;
              localStorage.code = response.data.code;
              localStorage.setItem('isLoggedIn', JSON.stringify(true));
              console.log(localStorage.isLoggedIn);
              setAnimating(false);
              setSuccess(true); 
              navigation.navigate('StartApp');
            } else{
              
              localStorage.isLoggedIn = false;
              setErrMsg(response.data.message);
              setAnimating(false);
              ToastAndroid.showWithGravity(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.TOP
              )
            }
          }
          );
  }

  const icons = {
    'user': require('../../../assets/account.png'),
    'pwd': require('../../../assets/account-lock1.png')
  };

  return (
    
    //<>{
      // success?
      // //localStorage.getItem('isLoggedIn')?    
      // navigation.navigate('StartApp')
      // :(
        <SafeAreaView style={styles.container1}>
          <TouchableOpacity onPress={()=> console.log("image pressed")}>
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
            <Text ref={errRef} ClassName={errMsg ? "errMsg": "offScreen"} aria-live="assertive" style={{color:"red", fontFamily: "monospace",maxWidth: '70%' }}> {errMsg} </Text>
            <Text style={styles.welcome}>
                  Login
            </Text>
            <View style= {styles.userContainer}>
              <Image
                style={styles.buttonImage}
                source={icons['user']}>
              </Image>
              <TextInput          
                style={styles.input}         
                onChangeText={onChangeText}
                placeholder="username"
                keyboardType="numeric"
                value={text}
              />
            </View>
            <View style= {styles.userContainer}>
              <Image
                style={styles.buttonImage}
                source={icons['pwd']}>
              </Image>
              <TextInput
                style={styles.input}
                onChangeText={onChangepassword}
                value={Password}
                placeholder="Password"
                keyboardType="numeric"
                secureTextEntry ={true}
                onBlur={ () => {backgroundColor: '#ededed'} }
                onFocus={ () => {backgroundColor: 'green'} }
              />
            </View>
            <View style={styles.btnContainer}>
              
              <TouchableOpacity style={styles.userBtn1}>
                <Text style={styles.btnText1} onPress={()=> handleBackPress()}>Exit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn2}>
                <Text style={styles.btnText} onPress={()=>onPressLogin()}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ForgotContainer}>
                <Text style={styles.btnText} onPress={()=>onPressLogin()}>Forgot Password?</Text>
            </View>
          </SafeAreaView>
        </SafeAreaView>
      // )}</>

   );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F9FBFC"
  },

  welcome: {
    fontSize: 40,
    fontFamily: 'monospace'
  },
  container: {
    
    backgroundColor: "#e1b382",
    paddingTop: 15,
    marginTop: -50,
    height: 500,
    alignItems: 'center',
    justifycontent: 'center',
    borderRadius: 10,
    
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 20},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    backgroundColor: 'tomato',
    padding: 15,
    width: "45%",
    borderRadius : 20
  },
  userBtn2:{
    backgroundColor: "#49d2b7",
    padding: 15,
    width: "45%",
    borderRadius : 20
  },
  btnText1: {
    fontSize : 18,
    textAlign: "center",
    color : "#fff"
  },
  btnText: {
    fontSize : 18,
    textAlign: "center",
  },
  logo: {
    marginTop: '-10%',
  },
  activityIndicator: {
  },
  userContainer: {
    flexDirection: 'row'
  },
  buttonImage : {
    marginTop: 30,
    width   : 40,
    height  : 30, 
  },
});


export default LoginScreen;