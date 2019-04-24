import Cookies from 'js-cookie';

export const isAuthenticated = () => Cookies.get('isAuthenticated') === 'true';
export const authenticate = () => Cookies.set('isAuthenticated', true);
export const unauthenticate = () => Cookies.set('isAuthenticated', false);
