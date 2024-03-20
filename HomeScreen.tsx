/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../constants/colors';
import images from '../../assets/Images';
import hotels from '../../constants/hotels';

const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeScreen = ({navigation}) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const CategoryList = () => {
    return (
      <View style={styles.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View style={styles.category}>
              <Text
                style={[
                  styles.categoryListText,
                  {
                    color:
                      selectedCategoryIndex === index
                        ? COLORS.primary
                        : COLORS.grey,
                  },
                ]}>
                {item}
              </Text>
            </View>
            {selectedCategoryIndex === index && (
              <View
                style={{
                  height: 3,
                  width: 30,
                  backgroundColor: COLORS.primary,
                  marginTop: 2,
                }}></View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Cards = ({hotel, index}) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });

    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreens', {item: hotel})}>
        <View style={styles.card}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              zIndex: 2,
              position: 'absolute',
              top: 20,
              left: 20,
            }}>
            ${hotel.price}
          </Text>
          <Animated.View
            style={[styles.cardOverlay, {opacity}]}></Animated.View>
          <View style={styles.priceTag}></View>
          <Image source={hotel.image} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: COLORS.dark,
                    marginTop: 3,
                  }}>
                  {hotel.name}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: COLORS.grey,
                    marginTop: 3,
                  }}>
                  {hotel.location}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {[1, 2, 3, 4].map((_, starIndex) => (
                    <Image
                      key={starIndex}
                      source={images.star2}
                      style={{
                        width: 15,
                        height: 15,
                        marginTop: 5,
                        marginRight: 5,
                      }}
                    />
                  ))}
                  <Image
                    source={images.star}
                    style={{
                      width: 15,
                      height: 15,
                      marginTop: 5,
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.grey,
                      marginLeft: 5,
                    }}>
                    31 Reviews
                  </Text>
                </View>
              </View>
              <Image
                source={images.save}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.primary,
                  marginTop: 5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const TopHotelCard = ({hotel}) => {
    return (
      <View style={styles.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Image
            source={images.star2}
            style={{tintColor: COLORS.orange, height: 13, width: 13}}
          />
          <Text style={{color: COLORS.white}}>5.0</Text>
        </View>
        <Image style={styles.topHotelCardImage} source={hotel.image} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: COLORS.dark}}>
            {hotel.name}
          </Text>
          <Text style={{fontSize: 8, fontWeight: 'bold', color: COLORS.grey}}>
            {hotel.location}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.header}>
        <View style={{paddingBottom: 15}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.grey,
            }}>
            Find your hotel
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: COLORS.grey,
              }}>
              in
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: COLORS.primary,
                marginLeft: 5,
              }}>
              India
            </Text>
          </View>
        </View>
        <Image
          source={images.profile}
          style={{
            width: 30,
            height: 30,
            tintColor: 'grey',
            marginTop: 5,
          }}
        />
      </View>

      <View style={styles.searchInputContainer}>
        <Image
          source={images.search}
          style={{width: 25, height: 25, tintColor: 'black', marginLeft: 10}}
        />
        <TextInput
          placeholder="Search"
          style={{fontSize: 20, paddingLeft: 10, color: 'grey'}}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={e => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            data={hotels}
            horizontal
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Cards hotel={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
            snapToInterval={cardWidth}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: COLORS.grey}}>
            Top hotels
          </Text>
          <Text style={{fontWeight: 'bold', color: COLORS.grey}}>Show all</Text>
        </View>
        <FlatList
          data={hotels}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
            flexDirection: 'row',
          }}
          renderItem={({item}) => <TopHotelCard hotel={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  category: {
    padding: 10,
    backgroundColor: COLORS.light,
    borderRadius: 20,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverlay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
