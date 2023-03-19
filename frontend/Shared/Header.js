import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style = {styles.header}>
        <View style = {styles.headerText}>
            <Text>Header</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header : {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Header