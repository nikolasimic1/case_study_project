import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { FunctionComponent, useState } from 'react';
import { WrapperBase } from './WrapperBase';
import { ErrorResponse, SignInForm } from '../../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { SubmitButton } from '../Common/SubmitButton';
import { useSetAtom } from 'jotai';
import { authAtom } from '../../stores';

export const SignIn: FunctionComponent = () => {
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [spinn, setSpinn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    setSpinn(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: data.email,
        password: data.password,
      });

      // Handle success
      if (response.status === 200) {
        setAuth({
          userName: response.data.user.name,
          userCategories: response.data.user.preferred_categories,
          userSources: response.data.user.preferred_sources,
          userAuthors: response.data.user.preferred_authors,
          token: response.data.token,
        });
        setSpinn(false);
        navigate('/');
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
      title="Sign In"
      description="Sign in with the credentials you provided at registration"
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          defaultValue=""
          {...register('email', {
            required: 'Email address is required!',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address format!',
            },
          })}
          error={errors.email ? true : false}
          helperText={errors.email?.message ? errors.email.message : ''}
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
          {...register('password', { required: 'Password is required!' })}
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
        <SubmitButton title="Sign In" spinn={spinn} fullWidth />
      </Box>
    </WrapperBase>
  );
};
