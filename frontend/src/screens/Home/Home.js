import { View, ScrollView, TextInput, SafeAreaView, StyleSheet, RefreshControl, BackHandler, DevSettings, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
//import { Table, Row, Rows} from 'react-native-table-component';
import Day1 from '../../components/Day1/Day1';
import Day2 from '../../components/Day2/Day2';
import Day3 from '../../components/Day3/Day3';
import Day4 from '../../components/Day4/Day4';
import Day5 from '../../components/Day5/Day5';
import Day6 from '../../components/Day6/Day6'; 

import { useNavigation } from '@react-navigation/native';
import Navigation from '../../components/Navigation';
import { makeRemote } from 'react-native-reanimated/lib/reanimated2/core';


const Home = () => {
    const handleBackPress = ()=>{
      BackHandler.exitApp();
    };
    useEffect(()=>{
      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    }, []);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }  

  const navigation = useNavigation('');
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    // DevSettings.reload();
    
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={styles.container1}>
      <ScrollView style= {{padding:20, height: 20}}
        refreshControl={
          <RefreshControl
            colors={['red','green','blue']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={{borderWidth:1, borderColor:"#C6C6C6", borderRadius:5, marginBottom: 15, padding:8}}>
          <TextInput placeholder='Search' style={{
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10
          }}/>
        </View>
        <Day1 />
        <Day2 />
        <Day3 />
        <Day4 />
        <Day5 />
        <Day6 />

        {/* <CollapsibleView title="07-08-2022" style={styles.collapsible}>
          <View style= {{flex:1, flexDirection: 'row', justifyContent: 'space-around'
        }}>
            <View>
              <Text style={{fontSize: 20, color:"#fff"}}>Ligne: L019</Text>
              <Text style={{fontSize: 20, color:"#fff"}}>Vehicule: 52423</Text>
              <Text style={{fontSize: 20, color:"#fff"}}>Service: Matin</Text>
              <Text style={{fontSize: 20, color:"#fff"}}>relief driver: 52442</Text>
            </View>
            <View>
              <Text style={{fontSize: 20, color:"#fff"}}>Début: 06:00</Text>
              <Text style={{fontSize: 20, color:"#fff"}}>Fin: 01:30</Text>
              <Text style={{fontSize: 20, color:"#fff"}}>Ligne: L019</Text>
            </View>
          </View>
        </CollapsibleView>   */}
        {/* <View style={styles.viewContainer}>
          <SectionList
            sections={[
              {title: today, data: [
                <ScrollView horizontal = {true}>
                  <View style={styles.tableContainer}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                      <Row data={TableHead} 
                          widthArr={widthArr}
                          style={styles.head}
                          textStyle={styles.text}
                      />
                      <Rows data={TableData} textStyle={styles.text} widthArr={widthArr}/>
                    </Table>
                  </View>
                </ScrollView>]},
              {title: '05-08-2022', data: [
                <ScrollView horizontal = {true}>
                  <View style={styles.tableContainer}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                      <Row data={TableHead} 
                          widthArr={widthArr}
                          style={styles.head}
                          textStyle={styles.text}
                      />
                      <Rows data={TableData} textStyle={styles.text} widthArr={widthArr}/>
                    </Table>
                  </View>
                </ScrollView>]},
              {title: '04-08-2022', data: [
                <ScrollView horizontal = {true}>
                  <View style={styles.tableContainer}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                      <Row data={TableHead} 
                          widthArr={widthArr}
                          style={styles.head}
                          textStyle={styles.text}
                      />
                      <Rows data={TableData} textStyle={styles.text} widthArr={widthArr}/>
                    </Table>
                  </View>
                </ScrollView>]},
              {title: '03-08-2022', data: [
                <ScrollView horizontal = {true}>
                  <View style={styles.tableContainer}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                      <Row data={TableHead} 
                          widthArr={widthArr}
                          style={styles.head}
                          textStyle={styles.text}
                      />       
                      <Rows data={TableData} textStyle={styles.text} widthArr={widthArr}/>
                    </Table>
                  </View>
                </ScrollView>]}
            ]}
            renderItem={({item}) => <View style={styles.item}>{item}</View>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => `basicListEntry-${item.title}`}
          />
        </View> */}
      </ScrollView>   
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: "#eeeee4",
    },
    logo: {
      marginLeft: '-6%',
      marginTop: '-10%'
    },
    viewContainer: {
        width : "100%",
        height : "100%",
        paddingBottom: '20%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderLeftWidth: 3,
        borderLeftColor: 'green',
        marginTop: 100
    },
    // text: { margin: 6 },
    // head: { height: 40, backgroundColor: '#f1f8ff' },
    // tableContainer: { flex: 1, paddingTop: 5, backgroundColor: '#fff' },

    //Section styles
    // sectionHeader: {
    //   padding: 10,
    //   paddingLeft: 10, 
    //   paddingRight: 10,
    //   marginTop: 20,
    //   fontSize: 14,
    //   fontWeight: 'bold',
    //   backgroundColor: 'tomato'//'rgba(247,247,247,1.0)',
    // },

    
})

export default Home