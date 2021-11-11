import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
import firestore from '../../firebase';
import firebase from 'firebase';

export default function ListScreen({navigation}) {
  const [contacts, setContacts]= useState([]);
  const [profileCard, setCard] = useState({});

  useEffect(() => {
    getContacts()
    
  }, [])

  const getContacts = async () => {
    let userContact = [];
    let userList = [];

    let user = firebase.auth().currentUser;
    let ref = firestore.collection('users').doc(user.uid).collection('contacts');

///////////Getting Contacts //////////////////
    let contactsSnapshot = await ref.get();
    contactsSnapshot.forEach((doc) => {
      userContact.push(doc.data().userContact);
    });
    console.log('Contacts', userContact);

///////////////?Getting user id's/////////////////////////
    const collRef = firestore.collection('users');

    let userSnapshot = await collRef.get();
    userSnapshot.forEach((doc) => {
      userList.push(doc.id);
    });
    console.log('Users ', userList);
/////////////////////Searching for equal id's//////////////////////////////////
    let contactList = [];

    userContact.forEach((element1) => {
      userList.forEach((element2) => {
        if (element1 === element2) {
        contactList.push(element1)
        }
      });
    });
   console.log("IGUALES ", contactList);
    //////////////////Comparing database id's with contact id's/////////////////
    let contactData = [];
    let userContactSnapshot = await collRef.get();

    // contactList.forEach((item, i) => {
    //   userContactSnapshot.forEach((doc) => {
    //     if (doc.id === contactList[i]) {
    //       console.log("DATA", doc.data(), ' ID ', doc.id);
    //       contactData.push(doc.data());
    //     }
    //   });
    // });

    // ===================================================
      contactList.forEach((item, i) => {
        collRef.onSnapshot(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            if (doc.id === contactList[i]) {
              console.log("DATA", doc.data(), ' ID ', doc.id);
              contactData.push(doc.data());
            }
          });
        });
      });

    // ===================================================

    console.log("LISTA CON DATOS: ", contactData);
    setContacts(contactData);
  }

  const _keyExtractor = (item, index) => item.id;

  const renderItem = ({item}) => {
    return (
      <SafeAreaView style={styles.textContainer2}>
        <Text style={styles.textStyle}>Company: {item.companyName} </Text>
        <Text style={styles.textStyle}>Name: {item.name} </Text>
        <Text style={styles.textStyle}>Phone: {item.phone} </Text>
        <Text style={styles.textStyle}>Email: {item.email} </Text>
        <Text style={styles.textStyle}>Address: {item.address} </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch'
  },
  item: {
    backgroundColor: '#d0c1ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  textContainer2: {
    width: '95%',
    backgroundColor: Colors.silver,
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 20
  },
  textStyle: {
    marginLeft: 20,
    fontFamily: 'Optima-Italic',
    fontSize: 15
  },
});