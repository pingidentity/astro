import { DELAY } from '../mocks/constants';

export const getAllUsers = (
  limit = 0,
  search = '',
  delay = DELAY,
): Promise<Response> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (limit > 0) {
        resolve(fetch(`/users?limit=${limit}&search=${search}`));
      } else {
        resolve(fetch(`/users?search=${search}`));
      }
    }, delay);
  });
};


export const getUserById = id => {
  return fetch(`/users/${id}`);
};
