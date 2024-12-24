import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';
import {
  cardContentStyle,
  cardContentWrapper,
  cardWrapper,
  categoryChipStyle,
  titleText,
} from './style';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

type Props = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
};

export const ArticleCard: FunctionComponent<Props> = ({
  id,
  title,
  date,
  category,
  image,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={cardWrapper}>
      <CardActionArea
        sx={{ display: 'flex' }}
        onClick={() => navigate(`/articles/${id}`)}
      >
        <CardMedia
          component="img"
          sx={{ width: 80, height: 64 }}
          image={image ?? '/default_image.jpg'}
          alt="Live from space album cover"
        />
        <Box sx={cardContentWrapper}>
          <CardContent sx={cardContentStyle}>
            <Typography component="div" variant="h6" sx={titleText}>
              {title}
            </Typography>
            <Stack flexDirection="row" alignItems="center">
              <Chip
                label={category}
                size="small"
                sx={{ ...categoryChipStyle, fontSize: '0.7rem' }}
              />
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ fontSize: '0.75rem' }}
              >
                {dayjs(date).format('DD.MM.YYYY.')}
              </Typography>
            </Stack>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};
