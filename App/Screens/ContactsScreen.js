// inside components/list.tsx
import  React, {useState, useLayoutEffect, useEffect} from "react";
import { Text, View, SafeAreaView, FlatList ,StyleSheet, Animated, Dimensions,RefreshControl,TextInput,ImageBackground,Alert } from "react-native";
import { Avatar, Surface } from "react-native-paper";
import images from '../Themes/Images'
import Colors from '../Themes/Colors';
import Metrics from '../Themes/Metrics';
import firestore from '../../firebase';
import firebase from 'firebase';




const { height } = Dimensions.get("screen");


export default function List() {

  const [contacts, setContacts]= useState([]);
  const [profileCard, setCard] = useState({});
  const [search, setSearch] = useState('');
  const [ContactsFilter, setContactsFilter] = useState([]);
  const [test, settest] = useState({});
  const [refreshing, setRefreshing] = useState(true);
  let user = firebase.auth().currentUser;
  const docRef = firestore.collection('users').doc(user.uid);
  

  useEffect(() => {
    getContacts()
    
  }, [])

  const getContacts = async () => {
    let userContact = [];
    let userList = [];

    
    let ref = firestore.collection('users').doc(user.uid).collection('contacts');

///////////Getting Contacts //////////////////
    let contactsSnapshot = await ref.get();
    contactsSnapshot.forEach((doc) => {
      userContact.push(doc.data().userContact);
    });
    console.log('Contacts', userContact);

    //////////////////////////OCR contacts///////////////////////
   
    /////////////////////////////////////////////////////////////

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

      docRef.onSnapshot(querySnapshot => {
        if(querySnapshot){
          let snapshot = querySnapshot.data()
          console.log(snapshot)
          settest(snapshot);
        }
      })
      
      
      const markers = [];
            await firebase.firestore().collection('users').doc(user.uid).collection('ocrContacts').get()
              .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                contactData.push(doc.data());
              });
            });
           // contactData.push(markers);
            console.log("CONTAAAACRRRR:", contactData);

      //       const P_Users = [];

      //       markers.forEach((item, i) => {
      //         if ("Public" === markers[i].privacy) {
      //           P_Users.push(markers[i]);
      //         }
      //       });
      
      
    // ===================================================

   // console.log("LISTA CON DATOS: ", typeof( contactData));
    setRefreshing(false);
    setContacts(contactData);
    setContactsFilter(contactData);
  }
  //===============================================
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource

      const textData = text.toUpperCase();
      /// search for category item.category 
      const newData = contacts.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase(): ''.toUpperCase(); 
        const itemData2 = item.companyName ? item.companyName.toUpperCase(): ''.toUpperCase(); 
        
          if (itemData.indexOf(textData) > -1){
            return itemData.indexOf(textData) > -1;
          }else if (itemData2.indexOf(textData) > -1){
            return itemData2.indexOf(textData) > -1;
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
  //===============================================
  
  const getItem = (item) => {
    Alert.alert(
      item.companyName,
      "Owner: "+item.name +
      "\nEmail: "+item.email+ "\n Phone:"+item.phone
    );
    // Function for click on an item
    // alert('Company name : ' + item.companyName + '\nOwner name : ' + item.name + '\nEmail : ' + item.email+'Phone: '+ item.phone);
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../Images/background.jpeg')} style={styles.image}>
      <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
      <Animated.FlatList
        data={ContactsFilter}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {

          return (
        
            <Animated.View>
              <Surface style={styles.surface}>
                <View style={{ flex: 0.3, justifyContent: "center" }}>
                  <Avatar.Image size={42} source={images.logo} />
                </View>
                <View
                  style={{
                    flex: 0.7,
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: "bold" }} onPress={() => getItem(item)}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{item.companyName}onPress={() => getItem(item)}</Text>
                </View>
              </Surface>
            </Animated.View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getContacts} />
        }
      />
      </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  surface: {
    height: height * 0.1,
    marginTop: 15,
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
