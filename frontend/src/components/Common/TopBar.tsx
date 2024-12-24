import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { defaultColors } from '../../colors';
import { mainWrapper, signInButton, signUpButton } from './style';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../stores';
import { ProfileButton } from '../Profile/ProfileButton';

export const TopBar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { token } = useAtomValue(authAtom);

  return (
    <>
      <AppBar color="primary" elevation={0} position="sticky">
        <Container maxWidth="lg">
          <Toolbar sx={{ '&.MuiToolbar-root': { px: 0 } }}>
            <IconButton sx={mainWrapper} onClick={() => navigate('/')}>
              <NewspaperIcon
                sx={{ color: defaultColors.white, fontSize: '2.5rem' }}
              />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: defaultColors.white }}
            >
              News
            </Typography>
            {token ? (
              <ProfileButton />
            ) : (
              <>
                <Button
                  sx={signUpButton}
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/sign-up')}
                >
                  Sign up
                </Button>
                <Button
                  sx={signInButton}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/sign-in')}
                >
                  Sign in
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
