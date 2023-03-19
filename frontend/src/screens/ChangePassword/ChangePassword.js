import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from "axios";
import Host from '../../components/Host';
import { useNavigation } from '@react-navigation/native';


const ChangePassword = () => {
    const [old, setOld] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [animating, setAnimating] = useState(false);
    const [errMsg, setErrMsg] = useState(''); 

    const navigation = useNavigation('');

    const onPressLogin = () =>{
        setAnimating(true);
        axios.post("http://"+Host+":3000/ChangePassword", {ancien : old, nouveau: newPassword, confirmation: confirmNewPassword})
        .then((response) => {
            if(response.data.result){
                setAnimating(false);
                Alert.alert("Success",`${response.data.message}`);
                setOld('');
                setNewPassword('');
                setConfirmNewPassword('');
            }else {
                setAnimating(false);
                setErrMsg(response.data.message);
            }
        });
    };
  return (
    <View style={styles.container}>
        <ActivityIndicator
            animating = {animating}
            color = 'green'
            size = "large"
            style = {styles.activityIndicator}
        />
        <Text ClassName={errMsg ? "errMsg": "offScreen"} aria-live="assertive" style={{color:"red", fontFamily: "monospace",maxWidth: '70%' }}> {errMsg} </Text>

        <TextInput          
          style={styles.input}           
          onChangeText={setOld}
          placeholder="Ancien mot de passe"
          keyboardType="numeric"
          value={old}
        />
        <TextInput          
          style={styles.input}           
          onChangeText={setNewPassword}
          placeholder="Nouveau mot de passe"
          keyboardType="numeric"
          value={newPassword}
        />
        <TextInput          
          style={styles.input}           
          onChangeText={setConfirmNewPassword}
          placeholder="Confirmer Nouveau mot de passe"
          keyboardType="numeric"
          value={confirmNewPassword}
        />
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.userBtn}>
                <Text style={styles.btnText} onPress={()=>onPressLogin()}>Valider</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 20,
        
    },
    input: {
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop : 30,    
        padding: 10,
        backgroundColor: "#F9FBFC"
    },
    btnText: {
        fontSize : 18,
        textAlign: "center",      

    },
    btnContainer: {
        flexDirection: "row",
        paddingLeft: 60,
        paddingBottom: 70,
        marginTop: 30,
        justifyContent: "space-around",
        width: "90%"
    },
    userBtn:{
        backgroundColor: "#FFD700",
        padding: 15,
        width: "45%",
        borderRadius : 20
      },
});

export default ChangePassword