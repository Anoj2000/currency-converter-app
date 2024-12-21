import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import LottieView from "lottie-react-native";


export default function App () {

  const router = useRouter();

   // Navigate to calculator after a 5-second delay
   useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/calculator');
    }, 2000); //After 2000 seconds navigate the calculator Screen

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [router]);


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to Currency Converter</Text>

      <Text style={styles.description}>
        Quickly convert currencies using the calculator or wait for automatic redirection
      </Text>

      <LottieView
        source={require('../assets/animations/Animation.json')}
        autoPlay
        loop
        style={styles.animation}
      />

    </View>  
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212438',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40, 
    fontWeight: '700', 
    color: '#050505', 
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 17, 
    color: '#f5f3ed', 
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 15, 
    lineHeight: 24, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#2980B9', 
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498DB', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, 
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  
  },
  animation: {
    width: 400,
    height: 400,
  }
});
