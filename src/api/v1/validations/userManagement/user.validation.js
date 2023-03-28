const yup = require("yup");
const { response } = require("../../utils");

const loginValidation = (req, res, next) => {
  const { usernameEmail, password } = req.body;

  const data = {
    usernameEmail,
    password,
  };

  const schema = yup.object().shape({
    usernameEmail: yup.string().max(100).required(),
    password: yup.string().required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      res.locals.params = data;
      next();
    })
    .catch((error) => response("Invalid login data", 400, error.errors, res));
};

const changePasswordValidation = (req, res, next) => {
  const { oldPassword, newPassword, newPasswordConf } = req.body;

  const data = {
    oldPassword,
    newPassword,
    newPasswordConf,
  };

  const schema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup
      .string()
      .min(6)
      .notOneOf([yup.ref("oldPassword"), null], "can't use old password as new")
      .required(),
    newPasswordConf: yup
      .string()
      .min(6)
      .oneOf([yup.ref("newPassword"), null], "new password doesn't match")
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      res.locals.params = data;
      next();
    })
    .catch((error) =>
      response("Invalid change password data", 400, error.errors, res)
    );
};

module.exports = {
  loginValidation,
  changePasswordValidation,
};
