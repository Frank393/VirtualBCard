import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
import firestore from '../../firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen ({navigation, route}, props) {
  ////////Getting data from firebase /////////////
  const user = firebase.auth().currentUser;
  const docRef = firestore.collection('users').doc(user.uid);

  const [profileCard, setCard] = useState({});

  useEffect(() => {
    getProfile()

  }, [])

  //loggin out function//
  function logOut () {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out succesful")
    }).catch(function(error) {
      console.log(err)
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logOut}>
          <Icon
            style= {{marginRight: 15}}
            name="ios-log-out"
            color='black'
            size={30}
          />
        </TouchableOpacity>
      )
    });
  }, [navigation])

  function getProfile() {

    docRef.onSnapshot(querySnapshot => {
      if(querySnapshot){
        let snapshot = querySnapshot.data()
        console.log(snapshot)
        setCard(snapshot);
      }
    })
  }

  return (
      <SafeAreaView style= {styles.container}>

        <SafeAreaView>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Virtual Business card
            </Text>
          </View>


          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
              Full Name:{'\n'} {profileCard.name}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
              Company Name:{'\n'} {profileCard.companyName}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
              Phone Number: {'\n'} {profileCard.phone}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
              Email: {'\n'} {profileCard.email}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
              Address:{'\n'} {profileCard.address}
            </Text>
          </View>
        </SafeAreaView>

        <Button
          title= "Add card info"
          onPress= {()=> {
          navigation.navigate('Register')}}
          color= {Colors.charcoal}
        />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: Colors.steel,

},
textContainer: {
  alignItems: 'center',
  width: '95%',
  height: '15%',
  backgroundColor: Colors.text,
  borderWidth: 1,
  marginLeft: 5,
  // marginTop: 5,
  marginBottom:20,
  borderRadius: 15
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
  marginTop: 20,
  fontFamily: 'Optima-Italic',
  fontSize: 23
},

});
