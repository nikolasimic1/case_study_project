import { FunctionComponent, useEffect, useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  Pagination,
  TextField,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ArticleCard } from './ArticleCard';
import { Article, ArticleFilters } from '../../types';
import { FilterField } from '..';
import { ArticleSkeleton } from './ArticleSkeleton';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { fetchArticlesApi, fetchFiltersApi } from '../../api';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../stores';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { filterButton } from './style';

export const ArticleHome: FunctionComponent = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [publishedAt, setPublishedAt] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { userCategories, userSources, userAuthors } = useAtomValue(authAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const loadingCategories = categories ? categories.length === 0 : false;
  const loadingSources = sources ? sources.length === 0 : false;

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await fetchFiltersApi();
      if (filters) {
        if (userCategories && userCategories !== '[]') {
          setCategories(JSON.parse(userCategories));
        } else {
          setCategories(filters.categories);
        }
        if (userSources && userSources !== '[]') {
          setSources(JSON.parse(userSources));
        } else {
          setSources(filters.sources);
        }
      }
    };

    const fetchArticles = async () => {
      const params: ArticleFilters = { page };

      if (search) params.search = search;
      if (userCategories && userCategories !== '[]') {
        params.categories = JSON.parse(userCategories);
      }
      if (category) params.categories = [category];
      if (publishedAt) params.published_at = publishedAt;
      if (userSources && userSources !== '[]') {
        params.sources = JSON.parse(userSources);
      }
      if (source) params.sources = [source];
      if (userAuthors && userAuthors !== '[]') {
        params.authors = JSON.parse(userAuthors);
      }

      const articlesData = await fetchArticlesApi(params);
      if (articlesData) {
        setArticles(articlesData.articles);
        setTotalPages(articlesData.pages);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchFilters();
    fetchArticles();
  }, [
    search,
    category,
    publishedAt,
    source,
    page,
    userCategories,
    userSources,
    userAuthors,
  ]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      setPublishedAt(dayjs(newValue).format('YYYY-MM-DD').toString());
    }
  };

  const filters = () => {
    return (
      <>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 2.5 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ mt: 0, pt: 0 }}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                label="Date"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                  field: {
                    clearable: true,
                    onClear: () => {
                      setSelectedDate(null);
                      setPublishedAt('');
                    },
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 2.5 }}>
          <FilterField
            label="Category"
            options={categories}
            loading={loadingCategories}
            value={category}
            setValue={setCategory}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 2.5 }}>
          <FilterField
            label="Source"
            options={sources}
            loading={loadingSources}
            value={source}
            setValue={setSource}
          />
        </Grid>
      </>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ my: '1rem' }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 10, sm: 10, md: 3, lg: 4.5 }}>
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </Grid>
        {isMobile ? (
          <>
            <Grid
              size={2}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
              }}
            >
              <IconButton
                size="medium"
                sx={filterButton}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? (
                  <CloseRoundedIcon fontSize="inherit" color="secondary" />
                ) : (
                  <FilterAltRoundedIcon fontSize="inherit" color="secondary" />
                )}
              </IconButton>
            </Grid>
            {showFilters && <>{filters()}</>}
          </>
        ) : (
          <>{filters()}</>
        )}

        <Grid size={12}>
          {loading && <ArticleSkeleton items={10} />}
          {articles.map((article: Article) => (
            <Box key={article.id}>
              <ArticleCard
                id={article.id}
                title={article.title}
                date={article.published_at}
                category={article.category}
                image={article.image}
              />
            </Box>
          ))}
        </Grid>
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {articles.length > 0 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
