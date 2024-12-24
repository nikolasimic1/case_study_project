import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { WrapperBase } from './WrapperBase';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { ErrorResponse, SignUpForm } from '../../types';
import { SubmitButton } from '../Common/SubmitButton';
import { enqueueSnackbar } from 'notistack';

export const SignUp: FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [spinn, setSpinn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    setSpinn(true);
    setMessage(null);
    try {
      const response = await axios.post('http://localhost:8000/api/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
      });

      // Handle successful registration
      if (response.status === 200) {
        setSpinn(false);
        enqueueSnackbar('You have successfully signed up.', {
          variant: 'success',
        });
      }
    } catch (err) {
      setSpinn(false);

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          setMessage(axiosError.response.data?.message || 'An error occurred');
        } else if (axiosError.request) {
          setMessage('No response from server. Please try again.');
        } else {
          setMessage(axiosError.message);
        }
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <WrapperBase
      title="Sign Up"
      description="Required fields are marked with *"
    >
      <>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Input */}
          <TextField
            label="Full Name *"
            type="text"
            variant="outlined"
            margin="normal"
            {...register('name', {
              required: 'Full name is required!',
              minLength: {
                value: 3,
                message: 'Minimum length is 3 characters!',
              },
            })}
            error={errors.name && true}
            helperText={errors.name?.message}
            fullWidth
          />

          {/* Email Input */}
          <TextField
            label="Email *"
            type="email"
            variant="outlined"
            autoComplete="off"
            margin="normal"
            {...register('email', {
              required: 'Email address is required!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address format!',
              },
            })}
            error={errors.email && true}
            helperText={errors.email?.message}
            fullWidth
          />

          {/* Password Input */}
          <TextField
            label="Password *"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            autoComplete="new-password"
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityRoundedIcon />
                      ) : (
                        <VisibilityOffRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            {...register('password', {
              required: 'Password is required!',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Password must include at least one letter, one number, one special character, and be at least 8 characters long.',
              },
            })}
            error={errors.password && true}
            helperText={errors.password?.message}
            fullWidth
          />

          {message && (
            <Alert
              sx={{ width: '100%', mt: '0.5rem' }}
              color="error"
              severity="error"
            >
              {message}
            </Alert>
          )}

          {/* Submit Button */}
          <SubmitButton title="Sign Un" spinn={spinn} fullWidth />
        </Box>
      </>
    </WrapperBase>
  );
};
