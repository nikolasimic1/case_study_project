import { Autocomplete, TextField } from '@mui/material';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

type Props = {
  label: string;
  options: string[];
  loading: boolean;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
};

export const FilterField: FunctionComponent<Props> = ({
  label,
  options,
  loading,
  value,
  setValue,
}: Props) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      loading={loading}
      value={value}
      size="small"
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_event, data) => {
        if (data) {
          setValue(data);
        } else {
          setValue(null);
        }
      }}
      fullWidth
    />
  );
};
