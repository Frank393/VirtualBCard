///////////////////no ////////////
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Share  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firestore from '../../firebase';
import firebase from 'firebase';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import { checkBluetoothAvailability } from 'react-native-google-nearby-messages';
import { BleManager } from 'react-native-ble-plx';

//export const manager = new BleManager();
/////SE SUPONE QUE FUNCIONE
export default function nfcScan() {
  
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
        scr
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
 
  
  }

