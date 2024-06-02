import { Request, Response } from 'express';
import AuthService from './service';
import { RESPONSES, RES_MSG } from '../../utils/response';
import logger from '../../utils/logger';
import CustomError from '../../utils/customError';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function healthCheck(req: Request, res: Response): Promise<any> {
    try {
        const isUserAvailable: any = await AuthService.checkServiceHealth();
        if (isUserAvailable.error) {
            throw new CustomError(RES_MSG.BADREQUEST, RESPONSES.BADREQUEST);
        }
        return res.send({
            status: isUserAvailable.status,
            message: isUserAvailable.message,
            error: isUserAvailable.error
        })
    } catch (error) {
        logger.error(error, 'Error In signup');
        return res.send({
            status: error.status || RESPONSES.INTERNALSERVER,
            error: true,
            message: error.message || RES_MSG.INTERNAL_SERVER_ERROR,
        });
    }
}

