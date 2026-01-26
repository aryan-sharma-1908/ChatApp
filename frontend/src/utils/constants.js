export const HOST = import.meta.env.VITE_SERVER;

export const AUTH_ROUTES = 'api/auth';

export const USER_ROUTES = 'api/user'

export const UPLOAD_ROUTES = 'api/upload'

export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`

export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`

export const NON_FRIENDS_ROUTES = `${USER_ROUTES}/non-friends`

export const PROFILE_ROUTES = `${USER_ROUTES}/profile`

export const ADD_FRIEND_ROUTES = `${USER_ROUTES}/add-friend`

export const FRIEND_ROUTES = `${USER_ROUTES}/friends`

export const MESSAGE_ROUTES = '/api/messages'

export const USER_INFO_ROUTES = `${USER_ROUTES}/info`