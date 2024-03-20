/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import COLORS from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const BillScreen = ({route}) => {
  const {totalPrice, tax, billAmount, selectedRoomOption} = route.params;
  const navigation = useNavigation();

  const handlePaymentNavigation = () => {
    if (!selectedRoomOption) {
      Alert.alert('Error', 'Room option not selected.');
      return;
    }
    navigation.navigate('PaymentScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.billContainer}>
        <Text style={styles.title}>Bill Details</Text>
        <View style={styles.billItem}>
          <Text style={styles.itemLabel}>Total Price:</Text>
          <Text style={styles.itemValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.itemLabel}>Tax:</Text>
          <Text style={styles.itemValue}>${tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.billItem, styles.totalAmount]}>
          <Text style={[styles.itemLabel, styles.totalLabel]}>
            Total Amount:
          </Text>
          <Text style={[styles.itemValue, styles.totalValue]}>
            ${billAmount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.itemLabel}>Room Option:</Text>
          <Text style={styles.itemValue}>{selectedRoomOption}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePaymentNavigation} style={styles.button}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Thank you for choosing our services!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  billContainer: {
    backgroundColor: COLORS.light,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemLabel: {
    fontSize: 18,
    color: COLORS.dark,
  },
  itemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  totalAmount: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grey,
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.grey,
  },
});

export default BillScreen;
