import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const CustomCollapsible = (props) => {
    //icons preparation
    const icons = {
        'Right': require('../../../assets/ArrowRight2.png'),
        'down': require('../../../assets/ArrowDown.png')
    };
    const descriptionState = {
        'visible': props.children,
        'hidden': props.none
    }
    const More = {
        'visible': 'More Details...',
        'hidden': props.none
    }
    const [expanded, setExpanded] = useState(false);

    let description = descriptionState['hidden'];
    let icon = icons['Right'];
    let more = More['visible'];
    let margin_Bottom = '5%';

    const toggle = () =>{
        setExpanded(!expanded);                 
    }

    if(expanded){ //because react native views reload when the props or state changes
        icon = icons['down'];
        description = descriptionState['visible'];
        more = More['hidden'];
        margin_Bottom = '5%';
    }
  return (
    <View style={{ backgroundColor: props.backgroundColor, borderRadius:8, marginBottom: margin_Bottom}}>
        <View style = {styles.Titlecontainer}>
            <TouchableHighlight onPress={()=>toggle()} underlayColor="#fff">
                <View style={styles.title}>
                    <View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: props.titleColor}}>
                            <Ionicons name= "today-sharp" size={24} color='gray' />
                            <Text>   </Text>
                             {props.title}
                        </Text>
                        <Text style={{fontSize: 17, color: '#63666A'}}>
                            <Ionicons name= "ios-play" size={20} color='gray' />
                            <Text>   </Text>
                            {props.subTitle}
                        </Text>
                        <Text style={{fontSize: 17, color: 'gray'}}>
                            <Ionicons name= "time-sharp" size={20} color='gray' />
                            <Text>   </Text>de {props.Debut} à {props.Fin}
                        </Text>
                        <Text style= {styles.text}>{more}</Text>
                    </View>
                    {/* <Text>description: {props.description}</Text>  */}
                    <Image
                        style={styles.buttonImage}
                        source={icon}
                    >
                    </Image>
                </View>       
            </TouchableHighlight>
        </View>
        
      <View style={styles.body}>
        {description}
      </View>
    </View>
  )
}

export default CustomCollapsible


//some styles

const styles = StyleSheet.create({
    title: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding:2,
        paddingLeft: 10
    },
    body: {
        borderTopWidth: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopColor: "tomato",
        backgroundColor: '#cce7e8',
    },
    buttonImage : {
        width   : 30,
        height  : 25, 
    },
    text: {
        marginLeft: '5%',
        color: 'green'
    }
});