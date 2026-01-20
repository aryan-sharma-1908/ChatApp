export const HOST = import.meta.env.VITE_SERVER;

export const AUTH_ROUTES = 'api/auth';

export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`

export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`

export const UPLOAD_ROUTES = 'api/upload'

export const USER_ROUTES = 'api/user'

export const NON_FRIENDS_ROUTES = `${USER_ROUTES}/non-friends`

export const PROFILE_ROUTES = `${USER_ROUTES}/profile`

export const ADD_FRIEND_ROUTES = `${USER_ROUTES}/add-friend`