import { Box, CircularProgress, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { loadingText, loadingWrapper } from './style';

export const LoadingPage: FunctionComponent = () => {
  return (
    <Box sx={loadingWrapper}>
      <NewspaperIcon sx={{ fontSize: 100, mb: 2 }} />
      <CircularProgress sx={{ mb: 2 }} color="inherit" />
      <Typography variant="h6" sx={loadingText}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};
