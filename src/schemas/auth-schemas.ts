import Joi from "joi";
import matches from "./joi-extensions";

const AuthVerifySchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required().min(6)
})

export type RegisterSchemaData = {
    email: string,
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string
}

const RegisterSchema = Joi.object<RegisterSchemaData>({
    email: Joi.string().email(),
    password: Joi.string().required().min(6),
    passwordConfirmation: matches('password'),
    firstName: Joi.string().required().min(3).max(20),
    lastName: Joi.string().required().min(2).max(20)
})

export {
    AuthVerifySchema,
    RegisterSchema
}
