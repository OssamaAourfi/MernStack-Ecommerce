module.exports = theFun => (req, res, next) => {
    Promise.resolve(theFun(req, res, next)).catch(next);
};