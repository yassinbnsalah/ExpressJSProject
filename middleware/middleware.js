const yup = require("yup");
const hotelSchema = yup.object().shape({
  adresse: yup
    .string()
    .required("Ladresse est obligatoire et doit être une chaîne de caractères"),
  email: yup
    .string()
    .email("Lemail doit être valide")
    .required("Lemail est obligatoire"),
});
const validateHotelData = async (req, res, next) => {
  try {
    await hotelSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = validateHotelData;
