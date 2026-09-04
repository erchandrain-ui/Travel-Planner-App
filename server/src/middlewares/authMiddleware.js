import jwt from "jsonwebtoken";

export default function authMiddleware(
  req,
  res,
  next
) {

  const authorization =
    req.headers.authorization;


  if (
    !authorization ||
    !authorization.startsWith(
      "Bearer "
    )
  ) {

    return res.status(401).json({

      success: false,

      message:
        "Authentication required"

    });

  }


  const token =
    authorization.split(" ")[1];


  if (!token) {

    return res.status(401).json({

      success: false,

      message:
        "Authentication token missing"

    });

  }


  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    req.user = decoded;


    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message:
        "Invalid or expired token"

    });

  }

}