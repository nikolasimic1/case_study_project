import axios from 'axios';
import { ArticleFilters, ArticlesData, Filters } from '../types';

const populateArticlesApi = async (): Promise<number | undefined> => {
  try {
    const response = await axios.get(
      'http://localhost:8000/api/fetch-articles',
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return;
  }
};

const fetchFiltersApi = async (): Promise<Filters | undefined> => {
  try {
    const response = await axios.get(
      'http://localhost:8000/api/articles/filters',
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching filters:', error);
    return;
  }
};

const fetchArticlesApi = async (
  params: ArticleFilters
): Promise<ArticlesData | undefined> => {
  try {
    const response = await axios.get('http://localhost:8000/api/articles', {
      params,
      withCredentials: true,
    });

    return {
      articles: response.data.data,
      pages: response.data.last_page,
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return;
  }
};

export { populateArticlesApi, fetchFiltersApi, fetchArticlesApi };
