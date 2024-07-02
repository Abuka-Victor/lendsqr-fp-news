import {PayloadAction, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {saveNews} from '../api/newsApi';

export type NewsType = {
  article_id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_icon: string;
};

interface NewsState {
  news: NewsType[] | null;
}

const INITIAL_STATE: NewsState = {
  news: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchLatestNews',
  async (_, thunkAPI) => {
    const response = await saveNews();
    return response;
  },
);

const newsSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setNews(state, action: PayloadAction<NewsType[]>) {
      state.news = action.payload;
    },
    removeNews(state) {
      state.news = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload as NewsType[];
    });
  },
});

export const {setNews, removeNews} = newsSlice.actions;
export default newsSlice.reducer;
