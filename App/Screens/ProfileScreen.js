import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Switch,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
import firestore from '../../firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
//import QRcodee from './QRcodeScreen';

export default function ProfileScreen ({navigation, route}, props) {
  ////////Getting data from firebase /////////////
  const user = firebase.auth().currentUser;
  const docRef = firestore.collection('users').doc(user.uid);

  const [profileCard, setCard] = useState({});
  const onPress= ()=> { navigation.navigate('QRcode')};
  
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
console.log("privacy " + profileCard.privacy);
  return (
      <View style= {styles.container}>
       <ImageBackground source={require('../Images/background.jpeg')} style={styles.image}>
       <View style={styles.profileContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#1079b6', '#129cd2', '#03bcd4']}
          style={styles.background}
          
        />

        <TouchableOpacity style={[styles.qrcode]}  onPress = {onPress}>
           <FontAwesome name="qrcode" color={'black'} size={70} />
        </TouchableOpacity>

       </View>
<View style={styles.square}>
        <View style={styles.profileContainer1}>
          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
              <FontAwesome name="user" color={'black'} size={26} />
              {'\t'}{profileCard.name}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
            <FontAwesome name="building" color={'black'} size={26} />
            {'\t'} {profileCard.companyName}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
            <FontAwesome name="phone" color={'black'} size={26} />
              {'\t'} {profileCard.phone}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
            <Icon name="mail" color={'black'} size={26} />
             {'\t'} {profileCard.email}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
            <FontAwesome name="map-pin" color={'black'} size={26} />
            {'\t'} {profileCard.address}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.textStyle}>
            <FontAwesome name="lock" color={'black'} size={26} />
            {'\t'} {profileCard.privacy}
            </Text>
          </View>
          
        </View>
  </View>
        <TouchableOpacity style={styles.editButton} onPress= {()=> {
          navigation.navigate('Edit Business Information')}}>
         <Text style={{fontSize:20}}>Edit</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 3,
  backgroundColor: Colors.snow,

},
profileContainer: {
  alignItems: 'center',
  height: '30%'
},
background: {
  position: 'absolute',
 // left: '-3%',
  top: -150,
  width: '110%',
  height: '150%',
  borderRadius: 190,
  
},
square: {
  margin:10,
  backgroundColor:'white',
  borderRadius:5

},

qrcode: {
  alignItems: 'center',
  justifyContent:'center',
  marginTop:'20%',
  width: '30%',
  height: '60%',
  backgroundColor: Colors.snow,
  borderWidth:.5,
  borderRadius: 190,
},

profileContainer1: {
  backgroundColor: 'transparent',
  alignItems: 'center',
},
textContainer2: {
  width: '90%',
  borderBottomWidth: 1,
  marginBottom: 15,
  marginLeft: 10,
},

textStyle: {
  marginLeft: 20,
  marginTop: 20,
  fontFamily: 'Arial',
  fontSize: 20
},

editButton: {
  width:'20%',
  height:'5%',
  alignSelf:'center',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#b33953',
  borderWidth:0.5,
  borderRadius:20,
  marginBottom:15
},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},

});
