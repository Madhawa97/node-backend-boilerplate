import { Request, Response } from 'express';

export const getUserProfile = (req: Request, res: Response) => {
  const user = req.user;
  res.json(user);
};
