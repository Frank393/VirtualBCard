import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

import Metrics from '../Themes/Metrics';
import ListScreen from './ListScreen';
import ScanScreen from './ScanScreen';
import ProfileScreen from './ProfileScreen';
import QRcodeScreen from './QRcodeScreen';
import RegisterScreen from './RegisterScreen';
import SearchScreen from './SearchScreen';
import qrScan from './qrScan';
import cardScan from './cardScan';
import ContactsScreen from './ContactsScreen';

const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => (
  <NavigationContainer>
    <Tab.Navigator
        initialRouteName="List"
        activeColor="#fff"
      >
        <Tab.Screen
          name="Contacts"
          component={ListStackScreen}
          options={{
            tabBarLabel: 'Contacts',
            tabBarColor: '#5f9ea0',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="list" color={color} size={26} />
            ),
          }}
        /> 
        <Tab.Screen
          name="Scan"
          component={ScanStackScreen}
          options={{
            tabBarLabel: 'Scanner',
            tabBarColor: '#1f35b5',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="camera-retro" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarColor: '#6f6a9c',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#5a8cad',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-card" color={color} size={26} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
);

export default TabScreen;

const ListStack = createStackNavigator();
const ListStackScreen = ({navigation}) => (
    <ListStack.Navigator screenOptions= {{
        headerStyle: {
        backgroundColor: '#5f9ea0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
      }}>
        <ListStack.Screen
        name="Contacts"
        component={ContactsScreen}
        />
      </ListStack.Navigator>
);

//Scanner stack
const ScanStack = createStackNavigator();
const ScanStackScreen = ({navigation}) => (
    <ScanStack.Navigator screenOptions= {{
        headerStyle: {
          backgroundColor: '#1f35b5git',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
        <ScanStack.Screen
          name="Scan"
          component={ScanScreen}
        />
        <ScanStack.Screen
          name="QR Code Scanner"
          component={qrScan}
        />
         <ScanStack.Screen
          name="Business Card Scanner"
          component={cardScan}
        />
      </ScanStack.Navigator>
);


//register stack
const RegisterStack = createStackNavigator();
const RegisterStackScreen = ({navigation}) => (
    <RegisterStack.Navigator screenOptions= {{
        headerStyle: {
          backgroundColor: '#6f6a9c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
        <RegisterStack.Screen
          name="Register"
          component={RegisterScreen}
        />
      </RegisterStack.Navigator>
);

//profile stack
const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions= {{
        headerStyle: {
          backgroundColor: '#5a8cad',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },

      }}>
        <ProfileStack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <ProfileStack.Screen
          name="QRcode"
          component={QRcodeScreen}
        />
        <ProfileStack.Screen
          name="Register"
          component={RegisterScreen}
        />

      </ProfileStack.Navigator>
);
//QR code screen
const QrcodeStack = createStackNavigator();
const QrcodeStackScreen = ({navigation}) => (
    <QrcodeStack.Navigator screenOptions= {{
        headerStyle: {
          backgroundColor: '#6f6a9c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
        <QrcodeStack.Screen
          name="QRcode"
          component={QRcodeScreen}
        />
         
      </QrcodeStack.Navigator>
);


//Search screen
const SearchStack = createStackNavigator();
const SearchStackScreen = ({navigation}) => (
    <SearchStack.Navigator screenOptions= {{
        headerStyle: {
          backgroundColor: '#6f6a9c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
        <SearchStack.Screen
          name="Search"
          component={SearchScreen}
        />
      </SearchStack.Navigator>
);