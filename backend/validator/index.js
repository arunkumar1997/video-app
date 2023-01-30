const Joi = require('joi');
const createHttpError = require('http-errors');
const VALIDATORS = {
    signup: () => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().min(3).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            passwordConfirm: Joi.ref('password')
        })
        return schema
    },
    login: () => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })
        return schema
    }
}

function Validator(validator) {
    //! If validator is not exist, throw err
    if (!VALIDATORS.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)
    return async function (req, res, next) {
        try {
            const validatorFunc = VALIDATORS[validator]
            const schema = validatorFunc()
            const validated = await schema.validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if (err.isJoi) { return next(createHttpError(422, { message: err.message })) }
            console.error(err)
            next(createHttpError(500))
        }
    }

}

module.exports = Validator