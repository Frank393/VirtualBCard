import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground

} from 'react-native';
import { HStack, Checkbox, Center, NativeBaseProvider } from "native-base"
import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
import image from '../Images/background.jpeg';
import firestore from '../../firebase';
import firebase from 'firebase';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'

//omport { CheckBox } from 'react-native-elements'

export default function RegisterScreen ({navigation, route}) {
  [companyName, setCompany] = useState('');
  [fullName, setName] = useState('');
  [phone, setPhone] = useState('');
  [email, setEmail] = useState('');
  [address, setAddress] = useState('');
  [privacy, setPrivacy] = useState('');
  [category, setCategory] = useState('');

  [data, setData] = useState([
    "Automotive","Business Support & Supplies","Computers & Electronics","Education","Entertainment","Food & Dining","Health & Medicine","Merchants (Retail)","Personal Care & Services"
  ]);

  [priv, setPriv] = useState([
    "Private", "Public"
  ]);
  
  // const image = { uri: "../" };
  //registering ID
  let user = firebase.auth().currentUser;
  let ref = firestore.collection('users').doc(user.uid);

  ///////////////Privacy
  const myRef = React.useRef({})  
  /////////////////////////////////

//uploading the data to firebase
  async function createCard() {
      await ref.set({
        name: fullName,
        companyName: companyName,
        phone: phone,
        email: email,
        privacy:privacy,
        category:category,
       
        
      }, { merge: true });

      console.log('REGISTERED');
      //Clearing input boxes after submit
      // setName('');
      // setCompany('');
      // setPhone('');
      // setEmail('');
      // setAddress('');
      navigation.navigate('Profile')

  }
  //////////////////////////////

   const Example = () => {
    const myRef = React.useRef({})
    return (
      <Checkbox
        value={true}
        colorScheme="success"
        onChange={privacy => setPrivacy("Private")}
      >
        Private
      </Checkbox>
    )
  }
  ///////////////////////////////

  return (
    <NativeBaseProvider >
     <View style= {styles.container}>
     <ImageBackground source={require('../Images/background.jpeg')} style={styles.image}>
      <ScrollView>
        <Text style={{fontFamily: 'Arial', fontSize: 20, alignSelf:'center', marginTop:50,marginBottom:25}}>
            Business Card Information
        </Text>
          <TextInput
          style= {styles.input}
          value= {companyName}
          placeholder='Company name'
          onChangeText= {companyName => setCompany(companyName)}
          />

          <TextInput
          style= {styles.input}
          value= {fullName}
          placeholder='Full name'
          onChangeText= {fullName => setName(fullName)}
          />

          <TextInput
          style= {styles.input}
          value= {phone}
          placeholder='Phone number'
          onChangeText= {phone => setPhone(phone)}
          />

          <TextInput
          style= {styles.input}
          value={email}
          placeholder='Email'
          onChangeText= {email => setEmail(email)}
          />

          <TextInput
          style= {styles.input}
          value= {address}
          placeholder='Address'
          onChangeText= {address => setAddress(address)}
          />

          <SelectDropdown
            buttonStyle={styles.dropMenu}
            buttonTextStyle={styles.buttonText}
            defaultButtonText='Business category'
            data={data}
            onSelect={(selectedItem, index) => {
              // console.log('selected', selectedItem, index)
              {setCategory(selectedItem)}
  
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              console.log('Category:',category)
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
          <SelectDropdown
            buttonStyle={styles.dropMenu}
            buttonTextStyle={styles.buttonText}
            defaultButtonText='Privacy'
            data={priv}
            onSelect={(selectedItem, index) => {
              // console.log('selected', selectedItem, index)
              {privacy => setPrivacy(selectedItem)}
              {setPrivacy(selectedItem)}
  
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              console.log('Category:',privacy)
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />

          {/* <View style={styles.checkbox}>
            <Example />
          </View> */}
          <TouchableOpacity style={styles.submitButton} onPress={createCard}>
            <Text style={{fontSize:20, fontFamily:'Arial'}}>Save</Text>
          </TouchableOpacity>
          
        </ScrollView>
        </ImageBackground>
      </View> 
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  input: {
    fontSize: 15,
    padding:10,
    borderWidth: .5,
    width: '98%',
    height: 40,
    marginVertical: Metrics.marginVertical,
    marginLeft:4,
    borderRadius: 10,
    backgroundColor: '#f2f9ff',

  },
  dropMenu: {
    marginVertical: Metrics.marginVertical,
    margin:4,
    width:'98%',
    height: 40,
    borderWidth: .5,
    borderRadius: 10,
    backgroundColor:'#f2f9ff',

  },
  buttonText: {
    fontSize:15,
    fontFamily: 'Arial',
    color:'#c2c2c2',
    textAlign:'left'

  },
 
  submitButton:{
    //borderWidth:1,
    marginTop:20,
    alignSelf:'center',
    justifyContent:'center',
    width:'40%',
    height: 45,
    alignItems: 'center',
    backgroundColor:'#b33953',
    borderRadius: 20,
    borderWidth:.5
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

});
