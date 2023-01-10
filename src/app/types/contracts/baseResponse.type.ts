export type BaseResponse<TData> = {
  ok: boolean;
  data: TData;
};

export type ErrorResponse = {
  ok: boolean;
  errors: string[];
};
