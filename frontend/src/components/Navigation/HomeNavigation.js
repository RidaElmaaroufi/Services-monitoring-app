import React, { useCallback, useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../../screens/LoginScreen';
import Home from '../../screens/Home';
import StartService from '../../screens/StartService';
import EndService from '../../screens/EndService';
import Settings from '../../screens/settings/Settings';
import CustommDrawer from '../CustommDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native'
import { BackHandler } from 'react-native';

const Drawer = createDrawerNavigator();
const HomeNavigation = () => {
  const navigation = useNavigation('');
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    // DevSettings.reload();
    navigation.navigate('Home');
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
      <Drawer.Navigator drawerContent= { props => <CustommDrawer {...props} />} screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#20DEDA',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        }
      }}>
        <Drawer.Screen name="Home" component={Home} options={{
          //headerShown: false,
          headerTitle: 'Home',
          //headerLeft: false,
          drawerIcon: ({color}) => (
            <Ionicons name= "home-outline" size={22} color={color} />
          )
        }}
        />
        <Drawer.Screen name="StartService" component={StartService} options={{
          title: 'Start Service',
          drawerIcon: ({color}) => (
            <Ionicons name= "enter-outline" size={22} color={color} />
          ),
        }}/>
        <Drawer.Screen name="EndService" component={EndService} options={{
          title: 'End Service',
          drawerIcon: ({color}) => (
            <Ionicons name= "flash-off-outline" size={22} color={color} />
          )
        }}/>
        <Drawer.Screen name="Settings" component={Settings} options={{
          drawerIcon: ({color}) => (
            <Ionicons name= "settings-outline" size={22} color={color} />
          )
        }}/>
        <Drawer.Screen name="Notifications" component={EndService} options={{
          drawerIcon: ({color}) => (
            <Ionicons name= "notifications-outline" size={22} color={color} />
          )
        }}/>
      </Drawer.Navigator>
  )
}

export default HomeNavigation;