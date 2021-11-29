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
  const [test, settest] = useState({});
  let user = firebase.auth().currentUser;
 //let users = firebase.auth().;
  const docRef = firestore.collection('users').doc(user.uid);

  useEffect(() => {
    getContacts()
    
  }, [])

  const getContacts = async () => {
    let userContact = [];
    let userList = [];

    
  


docRef.onSnapshot(querySnapshot => {
  if(querySnapshot){
    let snapshot = querySnapshot.data()
    console.log(snapshot)
    settest(snapshot);
  }
})


const markers = [];
      await firebase.firestore().collection('users').get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
          markers.push(doc.id,doc.data());
        });
      });


        // console.log("CONTACT PRIVAYC:",markers);

 
let ref = firestore.collection('users').doc(user.uid).collection('contacts');
 


// console.log('test console log !!!!!!!!!!!!!!!!!!! ');

// console.log('User list =', userList ,'user list done' );


// console.log('Other Privacy  = ',  test.privacy);

/////////////////////////////////////
const P_Users = [];

markers.forEach((item, i) => {
  if ("Public" === markers[i].privacy) {
    P_Users.push(markers[i]);
  }
});
console.log("P_Users:",typeof(P_Users));

    setContacts(P_Users);
    setContactsFilter(P_Users);
  }

    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource

        //let itemData = '' ; 
        const textData = text.toUpperCase();
        /// search for category item.category 
        const newData = contacts.filter(function (item) {
          // Applying filter for the inserted text in search bar
          
          const itemData = item.name ? item.name.toUpperCase(): ''.toUpperCase(); 
          const itemData2 = item.companyName ? item.companyName.toUpperCase(): ''.toUpperCase(); 
          const itemData3 = item.category ? item.category.toUpperCase(): ''.toUpperCase();
          
            if (itemData.indexOf(textData) > -1){
              return itemData.indexOf(textData) > -1;
            }else if (itemData2.indexOf(textData) > -1){
              return itemData2.indexOf(textData) > -1;
            }else if (itemData3.indexOf(textData) > -1){
              return itemData3.indexOf(textData) > -1;
            }

           



          
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
   // item.companyName ? item.companyName.toUpperCase(): ''.toUpperCase(); 
    const ItemView  = ({ item }) => {
      return (
        // Flat List Item
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {'Company name: '}
          {item.companyName.toUpperCase()}
          {', Owner name: '}
          {item.name.toUpperCase()}
          {', Category: '}
          {item.category.toUpperCase()}
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
      alert('Company name : ' + item.companyName + '\nOwner name : ' + item.name + '\nEmail : ' + item.email);
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