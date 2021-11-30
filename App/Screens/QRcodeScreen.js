import React, { Component, useState,useRef } from 'react';
import { Text, Image, View, StyleSheet, SafeAreaView, TouchableOpacity, Button,CameraRoll , ToastAndroid } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firebase from 'firebase';
import images from '../Themes/Images';
import Colors from '../Themes/Colors';
//import Metrics from '../Themes/Metrics';
//import RNFetchBlob from 'rn-fetch-blob'
//import fs from 'react-native-fs';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';



//import ViewShot from "react-native-view-shot";
//import Share from 'react-native-share'

export default function QRcodeScreen ({navigation, route}){
  //Getting the uid for the user

  let user = firebase.auth().currentUser;
  let logo = images.logo;
  const viewRef = useRef();

  const shareDummyImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
      });
      
        await Sharing.shareAsync( uri );
    } catch (err) {
      console.error(err);
    }
  };


  // var sharing = () => {
  // Sharing.shareAsync(base64Logo)
  // }
  // var onSave = () => {
  //   viewShot.current.capture().then(uri => {
  //    //Here you can write your logic of sharing or saving it on the device, I have used Share module 
  //    Share.share({
  //      message: "bob",
  //       url: "https://i.imgur.com/7RhCHg2.png",
      
       
       
  //    });
  //   });
  //  }
    
  
  // const onShare = async () => {
  //   viewShot.current.capture().then(uri => {
      
  //   });
  //   try {
      
  //     const result = await Share.share({
  //       message: 'React Native | A framework for building native apps using React',
  //       url: uri,
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return(
    <View style={styles.MainContainer}>
      
    <View style={styles.MainContainer} ref={viewRef}>
      <Text style={{fontSize: 20}}>Scan the QR Code to save the contact!</Text>
      
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
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
      <Button onPress={shareDummyImage} title="Share" />
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
