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