import * as ImagePicker from 'expo-image-picker';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView

} from 'react-native';
import firestore from '../../firebase';
import firebase from 'firebase';
import Metrics from '../Themes/Metrics';
import Colors from '../Themes/Colors';
import SelectDropdown from 'react-native-select-dropdown'

export default function App({navigation}) {

  [resultTest, setTest] = useState('');
  [resultTest1, setTest1] = useState('');
  [email, setEmail] = useState('');
  [phone, setPhone] = useState('');
  
  
  [pName, setName] = useState('');
  [address, setAddress] = useState('');
  [companyName, setCompany] = useState('');

  [dataT,setDataT] = useState([]);
  //[extraData, setExtra] = useState([]);
  var extraData =[];
  var data = [];

  
const API_KEY = 'AIzaSyD1UxrV8CEomA4usxl4XoYVbqldPgiXbqo';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  //console.log('callGoogleVisionAsync -> result', result.responses[0].textAnnotations);
  
  //each value after line break
  setTest(result.responses[0].textAnnotations[0].description.trim());
  

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
 
  
  var streetaddress = resultTest.split('\n');
  //////test///////////////
  for (var i=0; i < streetaddress.length; i++){
  // console.log('arr :',streetaddress[i]);
   
    if(emailRegex.test(streetaddress[i])){
      setEmail(streetaddress[i]);
      console.log("Es un email", email);
    }
    else if(phoneRegex.test(streetaddress[i])){
      setPhone(streetaddress[i]);
      console.log("Es un phone:", phone);
    }else{
      //console.log("Finished phone and email regex");
    }
  }

  //

  for (var i=0; i< streetaddress.length; i++){
    if (streetaddress[i] != email && streetaddress[i] != phone){
     extraData.push(streetaddress[i]);
      //console.log("No es igual");
    } 
    else{
      //console.log("Es igual");
    }
  }

//Object key value data
// for (var i=0; i<extraData.length; i++) {
//     data[i] = {
//         label: extraData[i] ,
//         value: extraData[i] ,
//     };
// }

//   console.log(data)


  return result.responses[0].textAnnotations[0].description;
}

  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus('Loading...');
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
        setDataT(extraData);



      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  let user = firebase.auth().currentUser;
    let ref = firestore.collection('users').doc(user.uid).collection('ocrContacts');

  async function createCard() {
    await ref.add({
      name: pName,
      companyName: companyName,
      phone: phone,
      email: email,
      address: address
     
      
    }, );

    console.log('REGISTERED');
    //Clearing input boxes after submit
    // setName('');
    // setCompany('');
    // setPhone('');
    // setEmail('');
    // setAddress('');
     

    navigation.navigate('Scan')

}

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {permissions === false ? (
        <Button onPress={askPermissionsAsync} title="Ask permissions" />
      ) : (
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
         
          {status && <Text style={styles.text}>Select the Company name:</Text> }
           
          {status &&  
          <SelectDropdown
          buttonStyle={styles.dropMenu}
          buttonTextStyle={styles.buttonText}
          defaultButtonText='Company name'
          data={dataT}
          onSelect={(selectedItem, index) => {
            {setCompany(selectedItem)}

          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            console.log('companyName',companyName)
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />}
        {status && <Text style={styles.text} >Select owner/employee name:</Text> }
           
           {status &&  
           <SelectDropdown
           buttonStyle={styles.dropMenu}
           buttonTextStyle={styles.buttonText}
           defaultButtonText='Name'
           data={dataT}
           onSelect={(selectedItem, index) => {
             // console.log('selected', selectedItem, index)
             {setName(selectedItem)}
 
           }}
           buttonTextAfterSelection={(selectedItem, index) => {
             console.log('name',pName)
             return selectedItem
           }}
           rowTextForSelection={(item, index) => {
             return item
           }}
         />}
         {status && <Text style={styles.text} >Select the Address:</Text> }
           
           {status &&  
           <SelectDropdown
           buttonStyle={styles.dropMenu}
           buttonTextStyle={styles.buttonText}
           defaultButtonText='Address'
           data={dataT}
           onSelect={(selectedItem, index) => {
             {setAddress(selectedItem)}
 
           }}
           buttonTextAfterSelection={(selectedItem, index) => {
             console.log('addres',address)
             return selectedItem
           }}
           rowTextForSelection={(item, index) => {
             return item
           }}
         />}
       
         
         
       {status && <Text style={styles.text} >Email:</Text> }
           {status && 
            <TextInput
              style= {styles.input}
              textAlign={'center'}
              fontSize={12}
              value= {email}
              placeholder='Email'
              editable={false}
              onChangeText= {email => setEmail(email)}
              />
           }
          {status && <Text style={styles.text} >Phone number:</Text> }
           {status &&
            <TextInput
            style= {styles.input}
            textAlign={'center'}
            fontSize={12}
            value= {phone}
            placeholder='Phone number'
            editable={false}
            onChangeText= {phone => setPhone(phone)}
            />
          }
          {status && 
          <Button onPress={createCard} title="Save" /> }

            <Button onPress={takePictureAsync} title="Scan" />
            
          </>
      )}

      </ScrollView>
    </View>
  );
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,

   marginHorizontal:7,
  },

  image: {
    marginTop:5,
    width: 300,
    height: 300,
    borderRadius:40,
    alignSelf: 'center'
    
  },
  text: {
    marginTop:5,
    marginBottom:3,
    fontSize:12
  },
  input: {
    fontSize: 13,
    borderWidth: 1,
    width: '98%',
    height: 40,
    //marginTop: 5,
    borderRadius: 10,
    backgroundColor: Colors.cloud,
    fontFamily: 'Arial',

  },
  touchableOpacity: {
  backgroundColor:'orange',
  alignSelf:'stretch',
  paddingHorizontal: 20,
  marginHorizontal:20

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
    fontFamily: 'Arial'
  }

  
});
