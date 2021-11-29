// inside components/list.tsx
import  React, {useState, useLayoutEffect, useEffect} from "react";
import { Text, View, StyleSheet, Animated, Dimensions,TextInput } from "react-native";
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

  useEffect(() => {
    getContacts()
    
  }, [])

  const getContacts = async () => {
    let userContact = [];
    let userList = [];

    let user = firebase.auth().currentUser;
    let ref = firestore.collection('users').doc(user.uid).collection('contacts');

///////////Getting Contacts //////////////////
    let contactsSnapshot = await ref.get();
    contactsSnapshot.forEach((doc) => {
      userContact.push(doc.data().userContact);
    });
    console.log('Contacts', userContact);

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

    // ===================================================

    console.log("LISTA CON DATOS: ", contactData);
    setContacts(contactData);
    setContactsFilter(contactData);
  }
  //===============================================
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {

      /// search for category item.category 
      const newData = contacts.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
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
  }

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
      <Animated.FlatList
       onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
        data={ContactsFilter}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item,index}) => {
          const inputRange = [
            -1,
            0,
            (height * 0.1 + 15) * index,
            (height * 0.1 + 15) * (index + 3),
          ];
          const scale = 1;
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const Offset = scrollY.interpolate({
            inputRange,
            outputRange: [0, 0, 0, 500],
          });
          return (
        
            <Animated.View
              style={{
                transform: [{ scale: scale }, { translateX: Offset }],
                opacity: opacity,
              }}
            >
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
                  <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{item.companyName}</Text>
                </View>
              </Surface>
            </Animated.View>
          );
        }}
      />
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
});
