import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Calculator() {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://open.er-api.com/v6/latest/USD';

  // Fetch exchange rates from the API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data && data.rates) {
          setExchangeRates(data.rates);
        } else {
          alert('Failed to fetch exchange rates.');
        }
      } catch (error) {
        alert('Error fetching exchange rates: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  // Check input amount validity
  const handleConversion = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid numeric amount');
      return;
    }

    // Calculate the exchange rate
    const rate = exchangeRates[targetCurrency] / exchangeRates[baseCurrency];
    if (rate) {
      setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
    } else {
      alert('Exchange rate not available for selected currencies');
    }
  };

  //loading the calculate screen display active indictor 
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading exchange rates...</Text>
      </View>
    );
  }

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Currency Converter</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Base Currency:</Text>
        <Picker
          selectedValue={baseCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setBaseCurrency(itemValue)}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>

        <Text style={styles.label}>Target Currency:</Text>
        <Picker
          selectedValue={targetCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setTargetCurrency(itemValue)}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>

        <Button title="Convert" onPress={handleConversion} />

        {convertedAmount !== null && (
          <Text style={styles.result}>
            {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212438',
  },
  contentContainer: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#454a6b',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#050505',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: '#050505',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498DB',
    textAlign: 'center',
  },
});
