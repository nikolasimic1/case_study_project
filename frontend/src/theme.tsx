import palette, { defaultColors } from './colors';

const theme = {
  palette: palette,
  shape: { borderRadius: 9 },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'h3' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'h4' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'h5' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'h6' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'subtitle1' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'subtitle2' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            color: defaultColors.primaryText,
          },
        },
        {
          props: { variant: 'caption' },
          style: {
            color: defaultColors.secondaryText,
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: defaultColors.primaryText,
          },
        },
      ],
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          color: defaultColors.primaryText,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: defaultColors.primaryText,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: 1.7,
          borderRadius: 28,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#2d1718',
        },
      },
    },
  },
};

export default theme;
