const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (currPassword, prevPassword) => {
  return await bcrypt.compare(currPassword, prevPassword);
};
module.exports = { hashPassword, comparePassword };
