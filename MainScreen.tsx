import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {IconOutline} from '@ant-design/icons-react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Detail from './screens/Detail';
import HomeHeader from './components/HomeHeader';
import CustomDrawerContent from './components/CustomDrawer';

// Redux
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {setUser} from './redux/user.slice';
import Profile from './screens/Profile';
import Explore from './screens/Explore';

// API
import getNews from './api/newsApi';
import {NewsType, fetchNews, setNews} from './redux/news.slice';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, swipeEnabled: true}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
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
        component={Explore}
        options={{
          tabBarIcon: ({color}) => (
            <IconOutline name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
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

export default function MainScreen() {
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState(true);
  const {user: userState} = useAppSelector(state => state.user);

  const checkNewsCache = async () => {
    try {
      let value = await AsyncStorage.getItem('news');
      if (value === null) {
        console.log('news value is null');
        dispatch(fetchNews());
      } else {
        dispatch(setNews(JSON.parse(value)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function onAuthStateChanged(user: FirebaseAuthTypes.User) {
    if (user !== null) {
      await checkNewsCache();
      dispatch(
        setUser({
          displayName: user.displayName,
          email: user.email as string,
          photoURL: user.photoURL,
          uid: user.uid,
        }),
      );
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(result => {
      if (result !== null) {
        onAuthStateChanged(result);
      }
    });
    if (initializing) setInitializing(false);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    console.log(userState);
  }, [userState]);

  if (initializing) {
    return <ActivityIndicator size={100} />;
  } else {
    return (
      <NavigationContainer>
        {userState !== null ? (
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={MyDrawer} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        ) : (
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
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}
