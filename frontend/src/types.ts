export type URLParams = {
  id?: number;
};

export type Article = {
  id: number;
  title: string;
  category: string;
  content: string;
  source: string;
  author: string;
  image: string;
  url: string;
  published_at: string;
};

export type ArticleAPI = {
  id: number;
  webTitle: string;
  sectionName: string;
  fields: {
    body: string;
    bodyText: string;
  };
  webUrl: string;
  webPublicationDate: string;
};

export type Filters = {
  categories: string[];
  sources: string[];
};

export type ArticleFilters = {
  page?: number;
  search?: string;
  published_at?: string;
  category?: string;
  source?: string;
  categories?: string[];
  sources?: string[];
  authors?: string[];
};

export type ArticlesData = {
  articles: Article[];
  pages: number;
};

export type ErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

export type SignInForm = {
  email: string;
  password: string;
};

export type ErrorResponse = {
  message: string;
};
