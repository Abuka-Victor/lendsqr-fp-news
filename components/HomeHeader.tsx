import React from 'react';
import {View, Text} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,
        alignItems: 'center',
      }}>
      <IconOutline
        name="search"
        size={24}
        onPress={() => navigation.navigate('Explore')}
      />
      <Text style={{color: '#000'}}>NEWS</Text>
      <View
        style={{
          width: 'auto',
          height: 'auto',
          backgroundColor: '#000',
          padding: 5,
          borderRadius: 100,
        }}>
        <IconOutline
          name="user"
          size={24}
          color="#fff"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
