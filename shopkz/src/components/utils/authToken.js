export const getToken = () => localStorage.getItem('user');
export const isAuthenticated = () => !!getToken();