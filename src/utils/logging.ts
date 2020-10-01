import {FINISH, TIMING} from "../constants";

export const logQuery = async (req, res, next) => {
    // logging query time
    const startHrTime = process.hrtime();

    const {body} = req;
    const {operationName} = body;

    res.on(FINISH, () => {
        if (body && operationName) {
            const elapsedHrTime = process.hrtime(startHrTime);
            const elapsedTimeInMs =
                elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
            console.info({
                type: TIMING,
                name: operationName,
                ms: elapsedTimeInMs
            });
        }
    });
    next();
}


export const heathCheck = async (req) => {
    // Replace  this conditional with more specific checks!
    if (!req) {
        throw ('Application is not running');
    }
}