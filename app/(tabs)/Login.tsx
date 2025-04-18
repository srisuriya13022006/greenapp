import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Signup">;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
     const navigation = useNavigation<SignupScreenNavigationProp>(); 
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth,email, password);
      console.log(response);
      alert("sign in success");
    }
    catch (error:any) {
      console.log(error);
      alert("Sign in failed"+error.message)
    }
    finally {
      setIsLoading(false);
    }

  };

    return (
       <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
              <Image
                source={require('../../assets/images/pexels-david-alberto-carmona-coto-434794-1151418.jpg')}
                style={styles.reactLogo}
              />
            }
          >
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
          />
          {isLoading?<ActivityIndicator size='large' color='#0000ff'/>:<></>}
          

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
            </View>
            </ParallaxScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 55, borderColor: 'green', borderWidth: 3, paddingHorizontal: 30, borderRadius: 17, marginBottom: 20 },
  button: { backgroundColor: 'green', padding: 20, borderRadius: 70, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
    link: { color: 'blue', textAlign: 'center', marginTop: 20 },
  reactLogo: {
    height: 250,
    width: 390,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
