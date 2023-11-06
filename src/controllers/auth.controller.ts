import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { sign } from 'jsonwebtoken';
import { envConfig } from '../configs/envConfig';

const SECRET_KEY = envConfig.JWT_SECRET;

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, gender, email, password } = req.body;

  if (!firstname || !lastname || !gender || !email || !password) {
    return res.status(400).json({
      error:
        'Please provide valid firstname, lastname, gender, email, and password'
    });
  }

  const newUser = await authService.registerUser(
    firstname,
    lastname,
    gender,
    email,
    password
  );
  if (newUser) {
    const token = sign({ userId: newUser.uuid }, SECRET_KEY);
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false // ! Set to true in a production environment with HTTPS
    });
    res.json(newUser);
  } else {
    res.status(409).json({ error: 'User with the same email already exists' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Please provide valid email and password' });
  }

  const user = await authService.loginUser(email, password);
  if (user) {
    const token = sign({ userId: user.uuid }, SECRET_KEY);
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false // ! Set to true in a production environment with HTTPS
    });
    res.json(user);
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('authToken');
  res.json({ message: 'Logged out successfully' });
};
