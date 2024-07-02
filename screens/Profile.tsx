import React from 'react';
import {Text, View, Image} from 'react-native';
import {useAppSelector} from '../redux/hooks';

const Profile = () => {
  const {user} = useAppSelector(state => state.user);
  if (user) {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            src={
              user.photoURL !== null
                ? user?.photoURL
                : 'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1'
            }
            style={{width: 150, height: 150, borderRadius: 99}}
          />
          <Text>{user?.displayName}</Text>
          <Text>{user?.email}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>No User</Text>
      </View>
    );
  }
};

export default Profile;
