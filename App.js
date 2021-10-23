import React from 'react';
import TabScreen  from './App/Screens/TabScreen';
import LoginScreen from './App/Screens/LoginScreen';
import firebase from 'firebase';

console.disableYellowBox = true;

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    checkIfLoged()

    //The return works as the "componentWillUnmount"
    return () => checkIfLoged();
  },);

  const checkIfLoged = () => {
    //This function checks if the user is logged in and decides wich screen to render accordingly
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setLoggedIn(true);
      }else{
        setLoggedIn(false);
      }
    });
  }

  if(loggedIn){
    return <TabScreen />;
  }else{
    return <LoginScreen />;
  }
}
