import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';

const {width, height} = Dimensions.get('screen');

const Login = ({navigation}: any) => {
  const [isKeyBoardShown, setIsKeyBoardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyBoardShown(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyBoardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  useEffect(() => {
    if (validateEmail(email) !== null) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }, [email]);

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/background.jpg')}
      blurRadius={2}>
      <View style={styles.topContainer}>
        <Text
          style={{
            color: '#1f0a04',
            fontSize: 30,
            marginTop: 90,
            fontWeight: 'black',
            textDecorationLine: 'underline',
          }}>
          Sign In
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Svg
          id="visual"
          viewBox="0 0 900 600"
          width={width}
          height={height}
          style={[styles.svg, {bottom: isKeyBoardShown ? -85 : 60}]}>
          <Path
            d="M0 429L37.5 417C75 405 150 381 225 342.2C300 303.3 375 249.7 450 204.5C525 159.3 600 122.7 675 121.2C750 119.7 825 153.3 862.5 170.2L900 187L900 601L862.5 601C825 601 750 601 675 601C600 601 525 601 450 601C375 601 300 601 225 601C150 601 75 601 37.5 601L0 601Z"
            fill="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
        </Svg>
        <KeyboardAvoidingView behavior="height">
          <View>
            <View style={styles.inputContainer}>
              <IconOutline name="inbox" size={24} />
              <TextInput
                style={{flex: 1, paddingLeft: 10}}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                autoFocus={true}
              />
              <IconOutline name={isValidEmail ? 'check' : 'close'} size={24} />
            </View>
            <Text
              style={{color: 'red', display: isValidEmail ? 'none' : 'flex'}}>
              Invalid Email
            </Text>
            <View style={styles.inputContainer}>
              <IconOutline name="lock" size={24} />
              <TextInput
                style={{flex: 1, paddingLeft: 10}}
                secureTextEntry={isPasswordShown}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
              />
              <IconOutline
                name={isPasswordShown ? 'eye' : 'eye-invisible'}
                size={24}
                onPress={() => setIsPasswordShown(!isPasswordShown)}
              />
            </View>
            <TouchableOpacity style={styles.button2}>
              <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bar} />
        <TouchableOpacity style={styles.button}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: 10,
            }}>
            <IconOutline name="google" size={24} color="#fff" />
            <Text style={{color: '#fff', fontSize: 20}}>
              Continue With Google
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 5, flexDirection: 'row', gap: 5}}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#518eef'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
    objectFit: 'cover',
  },
  contentContainer: {
    flex: 0.5,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  svg: {position: 'absolute', bottom: 60, left: 0, zIndex: -10},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderRadius: 5,
    width: width * 0.8,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#000',
    width: width * 0.8,
    borderRadius: 5,
  },
  button2: {
    backgroundColor: '#000',
    padding: 10,
    width: width * 0.8,
    borderRadius: 5,
    marginTop: 10,
  },
  topContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bar: {
    borderColor: '#000',
    width: width * 0.9,
    height: 1,
    backgroundColor: '#000',
    marginVertical: 20,
  },
});

export default Login;
