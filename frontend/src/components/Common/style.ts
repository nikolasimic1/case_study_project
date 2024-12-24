import { defaultColors } from '../../colors';

export const mainWrapper = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  bgcolor: defaultColors.primary,
  borderRadius: '0.3rem',
  p: '0.3rem',
  mr: '0.5rem',
};

export const signUpButton = { textTransform: 'none', whiteSpace: 'nowrap' };

export const signInButton = {
  color: defaultColors.primary,
  textTransform: 'none',
  whiteSpace: 'nowrap',
  ml: '0.5rem',
};

export const loadingWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: defaultColors.primary,
  color: '#fff',
  textAlign: 'center',
};

export const loadingText = {
  fontWeight: 'bold',
  letterSpacing: 1,
  color: defaultColors.white,
};
