import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firebase from 'firebase';
import images from '../Themes/Images'
import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';

export default function QRcodeScreen ({navigation, route}){
  //Getting the uid for the user
  let user = firebase.auth().currentUser;
  let logo = images.logo

  return(
    <View style={styles.MainContainer}>
      <Text style={{fontSize: 20}}>Scan the QR Code to save the contact!</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <QRCode
          logo={logo}
          logoBackgroundColor={'white'}
          logoBorderRadius={50}
          logoSize={100}
          //QR code value
          value={user.uid}
          //size of QR Code
          size={300}
          //Color of the QR Code (Optional)
          color="black"
          backgroundColor="white"
        />
      </View>
      </View>
  );
}

// export default QRcodeScreen;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: Colors.snow
  },
  TextInputStyle: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: '#F44336',
    marginBottom: 20,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
