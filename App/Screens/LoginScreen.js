import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import firestore from '../../firebase';
import firebase from 'firebase';

import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
import Logo from '../Themes/Images.js';

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

        <Image style= {{width: '80%', height: '25%'}} source={Logo.logo}/>
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
        <Button
          title='Login'
          onPress={login}
          color={Colors.banner}
        />

        <Text style= {styles.textStyle}>
          Don't have an account?
        </Text>

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

        <Button
          title="Sign Up"
          onPress={signUp}
          color= {Colors.banner}
        />

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 20,
    width: '100%'
  },
  input: {
    fontSize: 15,
    padding:10,
    width: '95%',
    borderWidth: 1,
    borderColor: Colors.frost,
    borderRadius: 10,
    marginVertical: Metrics.marginVertical,
    backgroundColor: Colors.cloud,

  },
  textStyle: {
    marginTop: 70,
    color: Colors.banner

  }
});
