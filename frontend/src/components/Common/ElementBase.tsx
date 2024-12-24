import { FunctionComponent } from 'react';
import { Outlet } from 'react-router';
import { TopBar } from './TopBar';

export const ElementBase: FunctionComponent = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};
