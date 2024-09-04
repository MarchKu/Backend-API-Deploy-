
export const registerCheck = async (req, res, next) => {
  if (
    req.body.username === "" ||
    req.body.password === "" ||
    req.body.first_name === "" ||
    req.body.last_name === ""
  ) {
    return res.status(400).json({ message: "Please add data" });
  }

  next();
};
