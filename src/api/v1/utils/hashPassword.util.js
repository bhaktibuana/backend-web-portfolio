const crypto = require("crypto");

const hashPassword = (password) => {
  const salt = "bc9df9a8";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

/* UNCOMMENT CODE BELLOW TO GENERATE SALT */

// const generateSalt = () => {
//   const saltLength = 8;
//   const salt = crypto
//     .randomBytes(Math.ceil(saltLength / 2))
//     .toString("hex")
//     .slice(0, saltLength);

//   return salt;
// };
// console.log(generateSalt());

module.exports = hashPassword;
