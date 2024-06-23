import React from 'react';
import {View, Text} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
        name="bars"
        size={24}
        onPress={() => navigation.openDrawer()}
      />
      <Text style={{color: '#000'}}>NEWS</Text>

      <TouchableOpacity onPress={() => {}}>
        <IconOutline name="bell" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
