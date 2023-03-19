import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Navigation from '../../components/Navigation'
import { useNavigation } from '@react-navigation/native'


const Settings = () => {
    const navigation = useNavigation('');
  return (
    <View>
        <View style= {styles.view}>
            <TouchableOpacity>
                <Text style = {{color: "black", fontSize: 18}}>Account</Text>
            </TouchableOpacity>
        </View>
        <View style= {styles.view}>
            <TouchableOpacity>
                <Text style = {{color: "black", fontSize: 18}}>Themes</Text>
            </TouchableOpacity>
        </View>
        <View style= {styles.view}>
            <TouchableOpacity onPress={() => navigation.navigate('Change Password')}>
                <Text style = {{color: "black", fontSize: 18}}>Change Password</Text>
            </TouchableOpacity>
        </View>
        <View style= {styles.view}>
            <TouchableOpacity>
                <Text style = {{color: "black", fontSize: 18}}>General management</Text>
            </TouchableOpacity>
        </View>
        <View style= {styles.view}>
            <Text style = {{color: "black", fontSize: 15}}>Help</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom:3
    }
});

export default Settings


