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
  ScrollView,
  Alert,
} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const {width} = Dimensions.get('screen');

const Signup = ({navigation}: any) => {
  const [isKeyBoardShown, setIsKeyBoardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (passwordMatch && email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          if (error.code === 'auth/weak-password') {
            Alert.alert(
              'The given password is too weak. Password should be at least 6 characters',
            );
          }

          console.error(error);
        });
    } else {
      Alert.alert('Please fix errors before proceeding');
    }
  };

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

  useEffect(() => {
    if (confirmPassword === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [confirmPassword, password]);

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
          Sign Up
        </Text>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="height">
          <View>
            <View style={styles.inputContainer}>
              <IconOutline name="user" size={24} />
              <TextInput
                style={{flex: 1, paddingLeft: 10}}
                placeholder="Full Name"
                onChangeText={setName}
                value={name}
              />
            </View>
            <View style={styles.inputContainer}>
              <IconOutline name="phone" size={24} />
              <TextInput
                style={{flex: 1, paddingLeft: 10}}
                placeholder="Phone Number"
                keyboardType="number-pad"
                onChangeText={setNumber}
                value={number}
              />
            </View>
            <View style={styles.inputContainer}>
              <IconOutline name="inbox" size={24} />
              <TextInput
                style={{flex: 1, paddingLeft: 10}}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
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
            <View style={styles.inputContainer}>
              <IconOutline name="lock" size={24} />
              <TextInput
                style={{flex: 1, paddingLeft: 10}}
                secureTextEntry={isConfirmPasswordShown}
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              <IconOutline
                name={isConfirmPasswordShown ? 'eye' : 'eye-invisible'}
                size={24}
                onPress={() =>
                  setIsConfirmPasswordShown(!isConfirmPasswordShown)
                }
              />
            </View>
            <Text
              style={{color: 'red', display: passwordMatch ? 'none' : 'flex'}}>
              Passwords do not match
            </Text>
            <TouchableOpacity style={styles.button2} onPress={handleSignUp}>
              <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                Sign Up
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
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#518eef'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    paddingBottom: 50,
  },
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
    flex: 0.3,
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

export default Signup;
