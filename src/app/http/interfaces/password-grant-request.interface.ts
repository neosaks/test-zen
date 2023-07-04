export interface IPasswordGrantRequest {
  grant_type: 'password';
  username: string;
  password: string;
  scope?: string;
  client_id: number;
  client_secret: string;
}
