import { defaultColors } from '../../colors';
import { DEFAULT_BOX_SHADOW } from '../style';

export const mainWrapper = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  bgcolor: defaultColors.primary,
  borderRadius: '0.3rem',
  p: '0.3rem',
  mr: '0.5rem',
};

export const cardWrapper = {
  display: 'flex',
  boxShadow: DEFAULT_BOX_SHADOW,
  mb: '0.5rem',
};

export const cardContentWrapper = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minWidth: 0,
};

export const cardContentStyle = {
  flex: '1 0 auto',
  py: '0.5rem',
  px: '1rem',
  '&:last-child': { pb: '0.5rem' },
};

export const titleText = {
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '0.9rem',
};

export const categoryChipStyle = {
  mr: '0.5rem',
};

export const filterButton = {
  p: '0.5rem',
  bgcolor: defaultColors.primary,
  color: 'white',
  '&:hover': {
    bgcolor: defaultColors.primary,
  },
};
