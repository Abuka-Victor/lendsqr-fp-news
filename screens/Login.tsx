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
  Alert,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {IconOutline} from '@ant-design/icons-react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const {width, height} = Dimensions.get('screen');

const Login = ({navigation}: any) => {
  const [isKeyBoardShown, setIsKeyBoardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    webClientId:
      '380985026197-vphtl5vhqn15bbd551fh72ds2p7081k6.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
            // Android and Apple only. No saved credential found, try calling `createAccount`
            console.log('No saved credential found');
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('Sign In Cancelled');
            // sign in was cancelled
            break;
          case statusCodes.ONE_TAP_START_FAILED:
            console.log('One Tap start failed');
            // Android and Web only, you probably have hit rate limiting.
            // On Android, you can still call `presentExplicitSignIn` in this case.
            // On the web, user needs to click the `WebGoogleSigninButton` to sign in.
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available');
            // Android-only: play services not available or outdated
            // Web: when calling an unimplemented api (requestAuthorization)
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log('Something else');
      }
    }
  }

  const handleSignIn = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in with email and password!');
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      Alert.alert('Please fix errors before proceeding');
    }
  };

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

  const validateEmail: (
    emailAddress: string,
  ) => RegExpMatchArray | null = emailAddress => {
    return String(emailAddress)
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
                secureTextEntry={!isPasswordShown}
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
            <TouchableOpacity style={styles.button2} onPress={handleSignIn}>
              <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bar} />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }>
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
