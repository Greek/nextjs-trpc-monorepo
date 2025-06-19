declare global {
  namespace Express {
    interface Request {
      rid?: string;
    }
  }
}

export {};
