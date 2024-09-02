export const port = 8000;

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// sameSite: "lax" as "lax",