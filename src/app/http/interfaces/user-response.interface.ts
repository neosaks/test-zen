export type PatchUserResponse = IPatchUserSuccessResponse | IPatchUserErrorResponse;

export interface IPatchUserSuccessResponse {
  ok: true;
}

export interface IPatchUserErrorResponse {
  ok: false,
  errorMessage: string;
}
