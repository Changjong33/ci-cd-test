const Joi = require("joi");

// JOI 스키마 정의
const dogSchema = Joi.object({
  name: Joi.string().min(1).required(),
  breed: Joi.string().min(1).required(),
  age: Joi.number().integer().min(0).required(),
});

// 미들웨어 함수
const validateDog = (req, res, next) => {
  const { error } = dogSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateDog;
