import crypto from "crypto";

export const hashPassword = (password: string): string => {
  const salt: string = "bc9df9a8";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

/* UNCOMMENT CODE BELLOW TO GENERATE SALT */

// const generateSalt = (): string => {
//   const saltLength: number = 8;
//   const salt: string = crypto
//     .randomBytes(Math.ceil(saltLength / 2))
//     .toString("hex")
//     .slice(0, saltLength);

//   return salt;
// };
// console.log(generateSalt());
