import Joi from 'joi';

export const registerValidation = (data) => {
    
    const schema = Joi.object({
        username: Joi.string()
            .min(6).max(25)
            .required(),
        name: Joi.string()
            .min(6).max(25)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email()
    });

    return schema.validate(data);
}

export const passwordValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    return schema.validate(data);
}

export const loginValidation = (data) => {
    
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(data);
}

export const itemValidation = (data) => {
    // const schema = Joi.object({
        
    // })
    return {};
}