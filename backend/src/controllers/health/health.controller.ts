import { NextFunction, Request, Response } from 'express';

const getHealth = (_: Request, res: Response, next: NextFunction): void => {
  try {
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

export { getHealth };
