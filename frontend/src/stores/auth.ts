import { atomWithStorage } from 'jotai/utils';

type UserAuth = {
  userName: string;
  userCategories: string;
  userSources: string;
  userAuthors: string;
  token: string;
};

export const authAtom = atomWithStorage<Partial<UserAuth>>(
  'auth',
  {},
  undefined,
  { getOnInit: true }
);

export const tokenAtom = atomWithStorage('token', null);
