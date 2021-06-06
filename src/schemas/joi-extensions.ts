import Joi from "joi";

export default function matches(field: string) {
    return Joi.any().valid(Joi.ref(field)).options({
        messages: {
            allowOnly: `Must match ${field}`
        }
    })
}