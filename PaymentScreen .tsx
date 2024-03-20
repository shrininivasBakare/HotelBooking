/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../constants/colors';
import images from '../../assets/Images';

const PaymentScreen = ({navigation, route}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    if (!validateCardNumber(cardNumber)) {
      Alert.alert('Error', 'Please enter a valid card number.');
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      Alert.alert('Error', 'Please enter a valid expiration date (MM/YY).');
      return;
    }

    if (!validateCVV(cvv)) {
      Alert.alert('Error', 'Please enter a valid CVV.');
      return;
    }

    Alert.alert('Success', 'Payment successful!');

    navigation.navigate('HomeScreen');
  };

  const validateCardNumber = number => {
    const cardNumberRegex = /^\d{16}$/;
    return cardNumberRegex.test(number);
  };

  const validateExpiryDate = date => {
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return expiryDateRegex.test(date);
  };

  const validateCVV = cvv => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <View style={styles.cardContainer}>
        <Image source={images.creditCard} style={styles.cardImage} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  cardContainer: {
    backgroundColor: COLORS.lightGrey,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardImage: {
    width: '70%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: COLORS.dark,
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

export default PaymentScreen;
