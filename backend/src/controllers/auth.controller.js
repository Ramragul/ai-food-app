import {
    signupService,
    loginService,
    resetPasswordService
  } from "../services/auth.service.js";
  
  export const signup = async (req, res) => {
    try {
      const data = await signupService(req.body);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { mobile, password } = req.body;
      const data = await loginService(mobile, password);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const resetPassword = async (req, res) => {
    try {
      const { mobile, newPassword } = req.body;
      const data = await resetPasswordService(mobile, newPassword);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };