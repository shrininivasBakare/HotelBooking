/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  ImageBackground,
  Text,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/colors';
import images from '../../assets/Images';

const DetailsScreens = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params;
  const [saved, setSaved] = useState(false);
  const [selectedRoomOption, setSelectedRoomOption] = useState('');
  const [selectedBreakfastOption, setSelectedBreakfastOption] = useState(false);

  const handleBookNow = () => {
    if (!item.price || isNaN(item.price)) {
      Alert.alert('Error', 'Invalid price for the hotel.');
      return;
    }

    if (!selectedRoomOption) {
      Alert.alert('Error', 'Please select a room option.');
      return;
    }

    let totalPrice = parseFloat(item.price);
    const tax = 0.1 * totalPrice;

    switch (selectedRoomOption) {
      case 'Non-AC':
        totalPrice += 20;
        break;
      case 'AC':
        totalPrice += 30;
        break;
      case 'Deluxe':
        totalPrice += 50;
        break;
      default:
        break;
    }

    if (selectedBreakfastOption) {
      totalPrice += 10;
    }

    const billAmount = totalPrice + tax;

    navigation.navigate('BillScreen', {
      totalPrice,
      tax,
      billAmount,
      selectedRoomOption,
    });
  };

  const openGoogleMaps = () => {
    if (
      item &&
      item.locationCoordinates &&
      item.locationCoordinates.latitude &&
      item.locationCoordinates.longitude
    ) {
      const {latitude, longitude} = item.locationCoordinates;
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(mapUrl);
    } else {
      Alert.alert('Error', 'Location coordinates not available.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,)"
      />
      <ImageBackground style={styles.headerImage} source={item?.image}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.back}
              style={{height: 30, width: 30, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity onPress={() => setSaved(!saved)}>
            <Image
              source={saved ? images.save2 : images.save}
              style={{height: 30, width: 30, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View>
        <TouchableOpacity onPress={openGoogleMaps}>
          <View style={styles.iconContainer}>
            <Image
              source={images.placeholder}
              style={{height: 25, width: 25}}
            />
          </View>
        </TouchableOpacity>
        <View style={{margin: 20, paddingHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
            {item.name}
          </Text>
          <Text style={{fontSize: 12, fontWeight: '400', color: COLORS.grey}}>
            {item.location}
          </Text>
          <View style={{marginTop: 20}}>
            <Text style={{lineHeight: 20, color: COLORS.grey}}>
              {item.details}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
            Price per night
          </Text>
          <View style={styles.priceTag}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.grey}}>
              {selectedBreakfastOption
                ? `$${parseFloat(item.price) + 10}`
                : selectedRoomOption === 'Non-AC'
                ? `$${parseFloat(item.price) + 20}`
                : selectedRoomOption === 'AC'
                ? `$${parseFloat(item.price) + 30}`
                : selectedRoomOption === 'Deluxe'
                ? `$${parseFloat(item.price) + 50}`
                : `$${item.price}`}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setSelectedBreakfastOption(!selectedBreakfastOption)
              }>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.grey,
                  marginLeft: 3,
                }}>
                {selectedBreakfastOption
                  ? 'With Breakfast'
                  : 'Without Breakfast'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => setSelectedRoomOption('Non-AC')}
            style={[
              styles.roomOptionButton,
              selectedRoomOption === 'Non-AC' && {
                backgroundColor: COLORS.primary,
              },
            ]}>
            <Text
              style={[
                styles.roomOptionText,
                selectedRoomOption === 'Non-AC' && {color: COLORS.white},
              ]}>
              Non-AC Room
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedRoomOption('AC')}
            style={[
              styles.roomOptionButton,
              selectedRoomOption === 'AC' && {backgroundColor: COLORS.primary},
            ]}>
            <Text
              style={[
                styles.roomOptionText,
                selectedRoomOption === 'AC' && {color: COLORS.white},
              ]}>
              AC Room
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedRoomOption('Deluxe')}
            style={[
              styles.roomOptionButton,
              selectedRoomOption === 'Deluxe' && {
                backgroundColor: COLORS.primary,
              },
            ]}>
            <Text
              style={[
                styles.roomOptionText,
                selectedRoomOption === 'Deluxe' && {color: COLORS.white},
              ]}>
              Deluxe Room
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleBookNow}>
          <View style={styles.btn}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Book Now</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
  },
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  roomOptionButton: {
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  roomOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});

export default DetailsScreens;
