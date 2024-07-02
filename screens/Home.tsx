import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useAppSelector} from '../redux/hooks';

import NewsItem from '../components/NewsItem';

const Home = () => {
  const {news} = useAppSelector(state => state.news);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}>
      <FlatList
        data={news}
        renderItem={({item}) => {
          return <NewsItem piece={item} key={item.article_id} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
