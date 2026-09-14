function validateBody(schema) {
  return (req, res, next) => {
    try {
      const parsedBody = schema.parse(req.body);
      req.body = parsedBody;
      return next();
    } catch (error) {
      // Zod v4 exposes `issues`; older releases expose `errors`.
      const issues = error.issues || error.errors;
      const errors = issues
        ? issues.map((err) => ({ path: err.path.join('.'), message: err.message }))
        : [{ message: error.message }];
      return res.status(400).json({ status: 'fail', message: errors[0].message, errors });
    }
  };
}

module.exports = { validateBody };
