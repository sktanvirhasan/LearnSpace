export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
    type: string;
  };
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}