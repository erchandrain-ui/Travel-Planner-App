export default function errorMiddleware(
  err,
  req,
  res,
  next
) {

  console.error(
    "Server Error:",
    err
  );


  const statusCode =
    err.status || 500;


  res.status(
    statusCode
  ).json({

    success: false,

    message:
      err.message ||
      "Internal server error"

  });

}