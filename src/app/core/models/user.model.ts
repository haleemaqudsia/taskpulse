// This mirrors your backend's UserDto exactly (see DTOs/AuthDtos.cs).
// Keeping the field names identical to the C# side means the JSON your
// API sends can be used directly, with no manual mapping.
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Member';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}