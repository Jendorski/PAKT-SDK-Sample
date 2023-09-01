export const internalResponse = (
  error: boolean,
  statusCode: number,
  message: string,
  data: any
) => {
  return { error, statusCode, message, data };
};
