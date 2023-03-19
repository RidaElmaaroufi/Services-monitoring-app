import React, { useEffect, useState } from 'react'
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../../src/screens/LoginScreen'
import Home from '../../../src/screens/Home'
import StartService from '../../screens/StartService'
import EndService from '../../screens/EndService'
import StartApp from '../../screens/StartApp';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import App from '../../../App';
import Boot from '../BOOT/Boot';
import axios from "axios";
import host from '../../components/Host';


const Stack = createNativeStackNavigator();
const Navigation = () => {
  //const route = useRoute();
  const [Storage, setStorage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(()=>{
  //   const data = localStorage.getItem('isLoggedIn');
  //   if(data){
  //     setStorage(JSON.parse(data));
  //   }

  // }, []);
  // console.log('OK1');
  // console.log(Storage);
  // console.log('OK1');
  // useEffect(()=>{
  //   localStorage.setItem('isLoggedIn', JSON.stringify(Storage));
  // });
  // console.log('avant')
  // console.log(localStorage.getItem('isLoggedIn'), 'ok?');
  useEffect(()=>{ 
    const fetch = async () => {
      await axios.get("http://"+host+":3000/users")
      .then((response) => {
        if(response.data.result){
          setLoggedIn(true); 
        }else{
          setLoggedIn(false)
        }
      })
    }
    fetch();
  }, []);
  // if(route.params.logout){
  //   setLoggedIn(false);
  // }

  //const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  //console.log(loggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="SVG" component={Boot} options={{headerShown: true,
              title: "ALSA AL BAIDA",
              headerStyle: { backgroundColor: '#49b7d2'},
              headerTitleStyle: {fontWeight: 'bold'},
              headerTintColor: '#ffffff',
            }}
        />
        <Stack.Screen name="Login" component={loggedIn? StartApp : LoginScreen} options={{headerShown: true,
              title: "ALSA AL BAIDA",
              headerStyle: { backgroundColor: '#49b7d2'},
              headerTitleStyle: {fontWeight: 'bold'},
              headerTintColor: '#ffffff',
              headerBackVisible: false
                 }}
        />
        <Stack.Screen name="StartApp" component={StartApp} options= {{ headerLeft: null, title: "ALSA AL BAIDA", 
                  headerStyle: { backgroundColor: '#49b7d2'},
                  headerTitleStyle: {fontWeight: 'bold'},
                  headerTintColor: '#ffffff',
                  headerBackVisible: false,
                }} 
        />
        <Stack.Screen name="Logout" component={ LoginScreen} options={{headerShown: true,
              title: "ALSA AL BAIDA",
              headerStyle: { backgroundColor: '#49b7d2'},
              headerTitleStyle: {fontWeight: 'bold'},
              headerTintColor: '#ffffff',
              headerBackVisible: false,
                 }} 
        />
        <Stack.Screen name="Change Password" component={ChangePassword} options={{headerShown: true,
              headerStyle: { backgroundColor: '#49b7d2'},
              headerTitleStyle: {fontWeight: 'bold'},
              headerTintColor: '#ffffff',
                 }} 
        />
        <Stack.Screen name="Home" component={Home} options= {{ headerLeft: null, title: "ALSA AL BAIDA", 
                  headerStyle: { backgroundColor: '#49b7d2'},
                  headerTitleStyle: {fontWeight: 'bold'},
                  headerTintColor: '#ffffff',
                  headerBackVisible: false
                }}
        />
        <Stack.Screen name="StartService" component={StartService} options= {{ title: "Start Service",

              headerStyle: { backgroundColor: '#49b7d2'},
              headerTitleStyle: {fontWeight: 'bold'},
              headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen name="EndService" component={EndService} options= {{title: "End Service",
              headerStyle: { backgroundColor: '#49b7d2'},
              headerTitleStyle: {fontWeight: 'bold'},
              headerTintColor: '#ffffff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default Navigation