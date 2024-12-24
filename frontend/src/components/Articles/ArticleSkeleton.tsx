import { FunctionComponent } from 'react';
import { Skeleton } from '@mui/material';

interface Props {
  items: number;
}

export const ArticleSkeleton: FunctionComponent<Props> = ({ items }: Props) => {
  return (
    <>
      {Array.from({ length: items }, (_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          animation="wave"
          width="100%"
          height={64}
          sx={{ mb: '0.5rem', bgcolor: '#eeeeee' }}
        />
      ))}
    </>
  );
};
