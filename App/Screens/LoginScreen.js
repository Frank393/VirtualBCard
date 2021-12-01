import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image ,SafeAreaView,ImageBackground , TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import firestore from '../../firebase';
import firebase from 'firebase';

import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
import Logo from '../Themes/Images.js';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function LoginScreen({ navigation }) {
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessageLogin, setErrorMessageLogin] = useState('');

  const signUp = async () => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword);
      if(response.user) {
        const user = firebase.auth().currentUser;
        var userRef = firestore.doc('users/' + user.uid);

        userRef.set({
          name: signUpName
        });
      }
      console.log(signUpName)
    } catch (err) {
      console.log(err);
    }
  }

  const login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
      console.log('Successfully logged in');
    } catch (err) {
      console.log(err);
    }
  }

  return (
   
      <View style={styles.container}>
        
      <ImageBackground source={require('../Images/background.jpeg')} style={styles.image}>
        
        <Image style= {{width: '80%', height: '25%',alignSelf:'center'}} source={Logo.logo}/>
        <KeyboardAwareScrollView>
        <TextInput
          style={[styles.input, {marginTop: 50}]}
          value={loginEmail}
          onChangeText={loginEmail => setLoginEmail(loginEmail)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={loginPassword}
          secureTextEntry={true}
          onChangeText={loginPassword => setLoginPassword(loginPassword)}
          placeholder="Password"
        />
        <TouchableOpacity style={styles.buttonStyles}
          onPress={login}>
            <Text style={{fontSize:15}}>Log In</Text>
          </TouchableOpacity>

        <View style={styles.textContainer}>
        <Text style= {styles.textStyle}>
          Don't have an account?
        </Text>
        </View>

        <TextInput
          style={styles.input}
          value={signUpName}
          onChangeText={signUpName => setSignUpName(signUpName)}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={signUpEmail}
          onChangeText={signUpEmail => setSignUpEmail(signUpEmail)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={signUpPassword}
          secureTextEntry={true}
          onChangeText={signUpPassword => setSignUpPassword(signUpPassword)}
          placeholder="Password"
        />

        <TouchableOpacity style={styles.buttonStyles} onPress={signUp}>
          <Text style={{fontSize:15}}>Sign Up</Text>
        </TouchableOpacity>

        </KeyboardAwareScrollView>
      </ImageBackground>
      
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize: 15,
    padding:5,
    width: '95%',
    borderWidth: 1,
    borderColor: Colors.frost,
    borderRadius: 10,
    marginVertical: Metrics.marginVertical,
    backgroundColor: 'white',
    marginLeft:10

  },
  textStyle: {
    color: Colors.banner,

  },
  textContainer:{
    marginTop:15,
    height:'5%',
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft:'25%',
    borderColor:'grey',
    borderRadius:10

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  buttonStyles: {
    borderWidth:0.5,
    width:'20%',
    height:'5%',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderColor: Colors.frost,
    borderRadius: 20

  }
});
