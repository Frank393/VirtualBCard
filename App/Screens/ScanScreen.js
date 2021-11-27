///////////////////no ////////////
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firestore from '../../firebase';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

/////SE SUPONE QUE FUNCIONE
export default function ScanScreen({navigation, route}, props) {
  const scanQR= ()=> { navigation.navigate('QR Code Scanner')};
  const scanCard= ()=> { navigation.navigate('Business Card Scanner')};

  return (
    <View style= {styles.container}> 
      <View style = {styles.cardScan}>
        <Text>Business Card Scanner</Text>
      <TouchableOpacity onPress={scanCard}>
          <Icon
            name="card"
            color='black'
            size={50}
          />
        </TouchableOpacity>
      </View>

      <View style = {styles.qrCode}>
      <Text>QR Code Scanner</Text>
      <TouchableOpacity onPress={scanQR}>
          <FontAwesome
           
            name="qrcode"
            color='black'
            size={50}
            
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

container: {
  flex:1,
  margin: 10


},
cardScan: {
  width: '50%',
  height: '50%',
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
  height: '50%',
  backgroundColor:'#d3d3d3',
  borderRadius: 30,
  justifyContent: 'center',
  alignItems:'center',
  borderWidth: 1,
  borderColor: '#a6a2a2',
  
  
},


});

