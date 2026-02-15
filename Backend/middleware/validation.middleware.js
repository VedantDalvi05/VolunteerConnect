const validateRequest = (schema) => {
    return (req, res, next) => {
        // Simple validation or use a library like Joi/Yup
        // For now, we'll placeholder this for extension
        // Example: if (schema.validate(req.body).error) ...
        next();
    };
};

module.exports = { validateRequest };
