import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react'
import CustomCollapsible from '../customCollapsible';
import axios from "axios";
import host from '../Host';

const Day4 = () => {
    const [date, setDate] = useState('');
    const [ligne, setLigne] = useState('');
    const [fin, setFin] = useState('');
    const [typeService, setTypeService] = useState('');
    const [vehicule, setVehicule] = useState('');
    const [debut, setDebut] = useState('');
    const [relief, setRelief] = useState('');
    const [hasOne, setHasOne] = useState(true);
    const [courses, setCourses] = useState('');

    //type de vehicule
    const type = {
        'UnCompartiment': require('../../../assets/Compartiment11.png'),
        'deuxCompartiments': require('../../../assets/Compartiment2.png')
    };

    const [colorService, setColorService] = useState('tomato');
    // useEffect(() =>{
    //     axios.get("http://"+host+":3000/feuilleService/day4")
    //     .then((response)=>{
    //         if(response.data.stateClosed)
    //         setColorService('green');
    //     });
    // }, );

    useEffect(() =>{
        axios.post("http://"+host+":3000/feuilleService/day4")
        .then((response)=> { 
          setDate(response.data.date);
          setLigne(response.data.ligne);
          setVehicule(response.data.vehicule);
          setDebut(response.data.debut);
          setFin(response.data.fin);
          setTypeService(response.data.typeService);
          setRelief(response.data.id_releve);
          setHasOne(response.data.hasOne);
          setCourses(response.data.courses)
        })
    }, );
  return (
    <View>
        <CustomCollapsible title={date.split('-').reverse().join('-')} 
                subTitle={ligne} 
                Debut={debut.substring(0,5)} 
                Fin={fin.substring(0,5)} 
                backgroundColor='#fff' titleColor={colorService}>
            <View style= {{flex:1, flexDirection: 'row', justifyContent:
                'space-around', padding:7}}>
                <View>
                    <Text style={{fontSize: 16, color:"#195e83"}}>Ligne: {ligne}</Text>
                    <Text style={{fontSize: 16, color:"#195e83"}}>Véhicule: {vehicule}</Text>
                    <Text style={{fontSize: 16, color:"#195e83"}}>Service: {typeService}</Text>
                    <Text style={{fontSize: 16, color:"#808080"}}>Courses: {courses}</Text>
                    <Text style={{fontSize: 16, color:"#808080"}}>Relève: {relief}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 16, color:"#195e83"}}>Début: {debut}</Text>
                    <Text style={{fontSize: 16, color:"#195e83"}}>Fin: {fin}</Text>
                    <>{
                        vehicule?
                        <Image
                            style={{width: '120%', height: '60%'}}
                            source={hasOne?type['UnCompartiment'] : type['deuxCompartiments']}
                            //resizeMode= 'contain'
                        />
                        :
                        <Text></Text>
                    }
                    </>
                </View>
            </View>
        </CustomCollapsible>
    </View>
  )
}

export default Day4