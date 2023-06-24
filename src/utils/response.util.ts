import { Response } from "express";

export const response = (
  message: string,
  status: number,
  res: Response,
  payload: any = null,
  count: number | null = null,
  prev: string | null = null,
  next: string | null = null,
  current: string | null = null
): void => {
  res.status(status).json([
    {
      status,
      message,
      payload,
      metadata: { count, prev, next, current },
    },
  ]);
};

export const serverErrorResponse = (error: any, res: Response): void => {
  res.status(500).json([
    {
      status: 500,
      message: "Internal server error",
      payload: error,
      metadata: { count: null, prev: null, next: null, current: null },
    },
  ]);
};
