import React from 'react';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CustomDrawerContent({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#000',
            borderRadius: 999,
          }}
        />
        <Text style={{color: '#000', fontWeight: 'bold'}}>NEWS</Text>
        <IconOutline name="down" size={15} color="#000" />
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              backgroundColor: '#f1f0f0',
              borderRadius: 5,
            }}>
            <IconOutline name="appstore" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>Home</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="bar-chart" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>
              Investment Options
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="line-chart" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>Analytics</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="sliders" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>Financial Tools</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="bell" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>Notifications</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="reconciliation" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>Updates</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="team" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>Community</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="setting" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>Settings</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 9,
              borderRadius: 5,
            }}>
            <IconOutline name="customer-service" size={24} />
            <Text style={{color: '#000', fontSize: 16}}>
              Feedback and Support
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 20,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: 40,
                height: 40,
                padding: 5,
                borderRadius: 999,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <IconFill name="thunderbolt" size={24} />
            </View>
            <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold'}}>
              Upgrade your account
            </Text>
            <Text style={{color: '#b3b2b2'}}>Unlock exclusive features</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                marginVertical: 15,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                alignItems: 'center',
                width: 230,
              }}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Upgrade to Pro
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#000',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconOutline
            name="user"
            size={20}
            color="#fff"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text>User Name</Text>
          <Text>username@email.com</Text>
        </View>
        <IconOutline name="logout" size={24} />
      </View>
    </View>
  );
}

export default CustomDrawerContent;
