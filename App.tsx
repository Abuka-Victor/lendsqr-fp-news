import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {IconOutline} from '@ant-design/icons-react-native';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Detail from './screens/Detail';
import HomeHeader from './components/HomeHeader';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Feed" component={MyTabs} />
      <Drawer.Screen name="Article" component={Home} />
    </Drawer.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="Home"
        component={MyTopTabs}
        options={{
          header: () => {
            return <HomeHeader />;
          },
          tabBarIcon: ({color}) => (
            <IconOutline name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <IconOutline name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <IconOutline name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Feed" component={Home} />
      <TopTab.Screen name="Top Stories" component={Home} />
      <TopTab.Screen name="Business" component={Home} />
    </TopTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={MyDrawer} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
