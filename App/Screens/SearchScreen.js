import React, { Component, useState, useLayoutEffect, useEffect} from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import _ from "lodash";
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import { getUsers, contains } from "./index";
import firestore from '../../firebase';
import firebase from 'firebase';
import 'firebase/firestore';


export default function SearchScreen({navigation, route}, props) {

  const [contacts, setContacts]= useState([]);
  const [profileCard, setCard] = useState({});
  const [search, setSearch] = useState('');
  const [ContactsFilter, setContactsFilter] = useState([]);

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
    setContactsFilter(contactData);
  }



  // import all the components we are going to use

 
    
    //const [masterDataSource, setMasterDataSource] = useState([]);
  
    // useEffect(() => {
    //   fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       setFilteredDataSource(responseJson);
    //       setContacts(responseJson);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }, []);
  
    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource


        /// search for category item.category 
        const newData = contacts.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setContactsFilter(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setContactsFilter(contacts);
        setSearch(text);
      }
    };
  
    const ItemView  = ({ item }) => {
      return (
        // Flat List Item
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {item.companyName}
          {'.'}
          {item.name.toUpperCase()}
        </Text>
      );
    };
  
    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      );
    };
  
    const getItem = (item) => {
      // Function for click on an item
      alert('Id : ' + item.companyName + ' Title : ' + item.name);
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          <FlatList
            data={ContactsFilter}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
  });