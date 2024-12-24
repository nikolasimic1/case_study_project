import { Box, Card, CardContent, Typography } from '@mui/material';
import { FunctionComponent, ReactElement } from 'react';
import { DEFAULT_BOX_SHADOW } from '../style';

type Props = {
  title: string;
  description: string;
  children: ReactElement;
};

export const WrapperBase: FunctionComponent<Props> = (props: Props) => {
  const { title, description, children } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 6rem)',
        backgroundColor: '#f5f5f5',
        m: '1rem',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: '0.5rem',
          boxShadow: DEFAULT_BOX_SHADOW,
          borderRadius: '1rem',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            sx={{ textAlign: 'center', mb: '0.5rem' }}
          >
            {description}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};
