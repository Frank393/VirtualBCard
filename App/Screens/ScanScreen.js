///////////////////no ////////////
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Surface } from "react-native-paper";

const { height } = Dimensions.get("screen");

/////SE SUPONE QUE FUNCIONE
export default function ScanScreen({navigation, route}, props) {
  const scanQR= ()=> { navigation.navigate('QR Code Scanner')};
  const scanCard= ()=> { navigation.navigate('Business Card Scanner')};

  return (
    <View style= {styles.container}> 
    <ImageBackground source={require('../Images/background.jpeg')} style={styles.image}>
      {/* <View style = {styles.cardScan}> */}
        <Surface style={styles.surface}>
          <Text style={{fontSize:20}}>Business Card Scanner</Text>
          <TouchableOpacity onPress={scanCard}>
              <Icon
                name="card"
                color='black'
                size={60}
              />
            </TouchableOpacity>
        </Surface>
      {/* </View> */}


      {/* <View style = {styles.qrCode}> */}
      <Surface style={styles.surface}>
        <Text style={{fontSize:20}}>QR Code Scanner</Text>
        <TouchableOpacity onPress={scanQR}>
            <FontAwesome
            
              name="qrcode"
              color='black'
              size={60}
              
            />
          </TouchableOpacity>
        </Surface>
      {/* </View> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

container: {
  flex:1,
  //margin: 10


},
cardScan: {
  width: '50%',
  height: '30%',
  backgroundColor:'#d3d3d3',
  borderRadius: 30,
  justifyContent: 'center',
  alignItems:'center',
  borderWidth: 1,
  borderColor: '#a6a2a2'
},
qrCode: {
  alignSelf:'flex-end',
  width: '50%',
  height: '30%',
  backgroundColor:'#d3d3d3',
  borderRadius: 30,
  justifyContent: 'center',
  alignItems:'center',
  borderWidth: 1,
  borderColor: '#a6a2a2',
},
surface: {
  height: height * 0.36,
  marginTop: 15,
  padding: 8,
  marginHorizontal: 10,
  borderRadius: 8,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#b0d0ff'

},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},

});

