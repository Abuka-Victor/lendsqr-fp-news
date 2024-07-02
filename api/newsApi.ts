import axios from 'axios';
import { NewsType } from '../redux/news.slice.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';


type GetNewsResponse = {
  results: NewsType[];
};

// 'https://newsdata.io/api/1/latest?apikey=pub_474237249fe2446a886499ae823400302b79a&language=en',

// 'https://reqres.in/api/users',

export async function getNews() {
  try {
    // 👇️ const data: GetNewsResponse
    const { data, status } = await axios.get<GetNewsResponse>(
      'https://newsdata.io/api/1/latest?apikey=pub_474237249fe2446a886499ae823400302b79a&language=en',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    console.log(JSON.stringify(data.results, null, 4));

    // 👇️ "response status is: 200"
    console.log('response status is: ', status);

    return data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export const saveNews = async () => {
  try {
    const newsResult = await getNews();
    const jsonValue = JSON.stringify(newsResult);
    await AsyncStorage.setItem('news', jsonValue);
    return newsResult;
  } catch (e) {
    console.log(e);
  }
};
