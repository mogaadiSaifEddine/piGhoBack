yup = require("yup");
const offreValidator = yup.object().shape({
  category: yup
    .string()
    .required()
    .oneOf(["internship", "partTime", "fullTime"]),
  description: yup.string().required(),
  requirements: yup.array().of(yup.string().nullable()).required().min(1),
  name: yup.string().required(),
  mode: yup.string().required().oneOf(["local", "remote"]),
});
const offerSearch = yup.object().shape({
  category: yup.string().oneOf(["internship", "partTime", "fullTime"]),
  country: yup.string().min(1).max(50),
  mode: yup.string().required().oneOf(["local", "remote"]),
});
module.exports = { offreValidator, offerSearch };
