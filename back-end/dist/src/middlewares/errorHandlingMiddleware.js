// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandlingMiddleware(error, req, res, next) {
    console.log(error);
    if (error.code) {
        return res.status(error.code).send(error.message);
    }
    return res.sendStatus(500);
}
