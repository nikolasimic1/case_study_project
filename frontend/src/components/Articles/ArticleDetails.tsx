import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Article, URLParams } from '../../types';
import axios from 'axios';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import { categoryChipStyle } from './style';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import { progressWrapper } from '../style';

export const ArticleDetails: FunctionComponent = () => {
  const params: URLParams = useParams();
  const id = params.id ?? '';
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/articles/${id}`,
          { withCredentials: true }
        );
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article details:', err);
        setError('Failed to fetch article details.');
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={progressWrapper}>
        <CircularProgress size="2rem" />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ my: '1rem' }}>
      {article ? (
        <>
          <Grid container>
            <Grid size={10}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {article.title}
              </Typography>
            </Grid>
            <Grid
              size={2}
              display="flex"
              flexDirection="row"
              alignItems="start"
              justifyContent="end"
            >
              <Button variant="outlined" onClick={() => navigate('/')}>
                <WestRoundedIcon />
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            fontSize="0.8rem"
            gutterBottom
          >
            <Chip label={article.category} sx={categoryChipStyle} />
            {dayjs(article.published_at).format('DD.MM.YYYY.')}
          </Typography>
          <Divider sx={{ my: '1rem' }} />
          {article.image && (
            <>
              <Box
                component="img"
                src={article.image}
                sx={{ width: '100%', height: 'auto', borderRadius: '0.7rem' }}
              />
              <Divider sx={{ my: '1rem' }} />
            </>
          )}
          <Box dangerouslySetInnerHTML={{ __html: article.content }} />
          <Divider sx={{ my: '1rem' }} />
          <Typography
            variant="caption"
            color="textSecondary"
            display="block"
            sx={{ mt: 2 }}
          >
            Source: {article.source}
          </Typography>
          <Typography variant="caption" color="textSecondary" display="block">
            By: {article.author}
          </Typography>
        </>
      ) : (
        <Typography>No article details available.</Typography>
      )}
    </Container>
  );
};
