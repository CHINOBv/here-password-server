import Joi from "joi";

export const validateBody = (schema: any) => {
  return (req: any, res: any, next: any) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }
    console.log(res.value);

    if (!req.body) {
      req.value = {};
    }
    next();
  };
};

export const schemas = {
  authSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
