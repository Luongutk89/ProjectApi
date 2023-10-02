const apiRouter = (app) => {
    app.use('/api/v1/users', require('./userRoutes'));
    app.use('/api/v1/notes', require('./noteRoutes'));
};

module.exports = apiRouter;
