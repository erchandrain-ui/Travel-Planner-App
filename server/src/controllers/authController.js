import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User.js";


/*
|--------------------------------------------------------------------------
| Generate JWT
|--------------------------------------------------------------------------
*/

function generateToken(user) {

  return jwt.sign(

    {
      id: user._id.toString(),

      email: user.email
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    }

  );

}


/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export async function register(
  req,
  res,
  next
) {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Name, email and password are required"

      });

    }


    if (password.length < 6) {

      return res.status(400).json({

        success: false,

        message:
          "Password must contain at least 6 characters"

      });

    }


    const normalizedEmail =
      email
        .trim()
        .toLowerCase();


    const existingUser =
      await User.findOne({
        email: normalizedEmail
      });


    if (existingUser) {

      return res.status(409).json({

        success: false,

        message:
          "Email already registered"

      });

    }


    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    const user =
      await User.create({

        name:
          name.trim(),

        email:
          normalizedEmail,

        password:
          hashedPassword

      });


    const token =
      generateToken(user);


    return res.status(201).json({

      success: true,

      message:
        "Registration successful",

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      },

      token

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export async function login(
  req,
  res,
  next
) {

  try {

    const {
      email,
      password
    } = req.body;


    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required"

      });

    }


    const normalizedEmail =
      email
        .trim()
        .toLowerCase();


    const user =
      await User.findOne({
        email: normalizedEmail
      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    const token =
      generateToken(user);


    return res.json({

      success: true,

      message:
        "Login successful",

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      },

      token

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

export async function me(
  req,
  res,
  next
) {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select(
        "-password"
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found"

      });

    }


    res.json({

      success: true,

      user

    });

  } catch (error) {

    next(error);

  }

}