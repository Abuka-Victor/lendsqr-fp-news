import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../redux/hooks';

const Explore = () => {
  const news = useAppSelector(state => state.news);
  useEffect(() => {
    console.log(JSON.stringify(news, null, 4));
  }, [news]);
  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({});
