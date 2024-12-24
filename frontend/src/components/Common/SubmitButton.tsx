import { FunctionComponent } from 'react';
import { Button, CircularProgress } from '@mui/material';

interface Props {
  title: string;
  spinn?: boolean;
  fullWidth?: boolean;
}

export const SubmitButton: FunctionComponent<Props> = ({
  title,
  spinn,
  fullWidth,
}: Props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      sx={{ mt: 2, py: 1, textTransform: 'none' }}
      disabled={spinn}
      fullWidth={fullWidth}
    >
      {spinn ? (
        <CircularProgress size="1.2rem" sx={{ my: '0.38rem', mx: '1rem' }} />
      ) : (
        title
      )}
    </Button>
  );
};
