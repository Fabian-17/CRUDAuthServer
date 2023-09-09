import { validationResult } from 'express-validator';

//The application data is validated
export const validator = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next()
};