import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView

} from 'react-native';
import { HStack, Checkbox, Center, NativeBaseProvider } from "native-base"
import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
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
  [privacy, setPrivacy] = useState('Public');
  [category, setCategory] = useState('');

  [data, setData] = useState([
    "Automotive","Business Support & Supplies","Computers & Electronics","Education","Entertainment","Food & Dining","Health & Medicine","Merchants (Retail)","Personal Care & Services"
  ])
  

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
    <NativeBaseProvider style= {styles.container}>
      <ScrollView>
       <Text style={{fontFamily: 'Optima-Italic', fontSize: 17}}>
          Add your business card information
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

      <Example/>
        <TouchableOpacity onPress={createCard}>
          <Icon
            name='ios-add'
            type='ionicon'
            color='#517fa4'
            size = {Metrics.icons.large}
          />
        </TouchableOpacity>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    fontSize: 15,
    padding:10,
    borderWidth: 1,
    width: '95%',
    height: 50,
    marginVertical: Metrics.marginVertical,
    borderRadius: 10,
    backgroundColor: Colors.cloud,

  },
  buttonSwitch: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems:'center',
    justifyContent:'space-evenly',
    fontFamily: 'Arial',
    fontSize: 15
  },
  dropMenu: {
    width:'98%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.cloud,

  },
  buttonText: {
    fontSize:13,
    fontFamily: 'Arial',

  }
});
