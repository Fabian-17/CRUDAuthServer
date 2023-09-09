import { body } from "express-validator";
import passwordValidator from 'password-validator';
const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .has().digits(1);


export const createUserSchema = [
    body('username')
      .exists()
      .notEmpty().withMessage('The username must not be empty.')
      .isString().withMessage('The username must be string.'),
    body('password')
      .exists()
      .notEmpty().withMessage('Password must not be empty.')
      .isString().withMessage('The password must be a string and must contain at least one number.')
      .custom((value) => {
        if (!passwordSchema.validate(value)) {
          return('Password does not meet requirements');
        }
        return true;
      }),
    body('email')
      .exists()
      .notEmpty().withMessage('Email should not be empty.')
      .isEmail().withMessage('Must be in email format')
  ]

  export const loginUserSchema = [
    body('email')
      .exists()
      .notEmpty().withMessage('Email should not be empty.')
      .isEmail().withMessage('Must be in email format'),
    body('password')
      .exists()
      .notEmpty().withMessage('Password must not be empty.')
      .isString().withMessage('The password must be a string and must contain at least one number.')
      .custom((value) => {
        if (!passwordSchema.validate(value)) {
          return('Password does not meet requirements');
        }
        return true;
      })
  ]