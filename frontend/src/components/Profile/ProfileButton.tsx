import { FunctionComponent, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { RESET } from 'jotai/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { authAtom } from '../../stores';
import { defaultColors } from '../../colors';
import { buttonWrapper, iconStyle } from './style';

export const ProfileButton: FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);
  const { userName } = useAtomValue(authAtom);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={buttonWrapper}>
        <IconButton
          sx={{ ml: '0.5rem', p: '0.4rem', bgcolor: defaultColors.profileBg }}
          color="secondary"
          aria-label="Settings"
          onClick={handleClick}
        >
          <PersonRoundedIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ pointerEvents: 'none' }}>{userName}</MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('profile-settings')}>
          <SettingsRoundedIcon sx={iconStyle} />
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAuth(RESET);
            navigate('/');
          }}
        >
          <LogoutRoundedIcon sx={iconStyle} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
