import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';
import AuthService from './service';
import { RESPONSES, RES_MSG } from '../../utils/response';
import config from '../../config/env';
import logger from '../../utils/logger';
import CustomError from '../../utils/customError';
import { PromiseResolve } from '../../utils/common.interface';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function signup(req: Request, res: Response): Promise<any> {
    try {
        const isUserAvailable: any = await AuthService.searchUser({ email: req.body.email });

        if (!isUserAvailable.error) {
            throw new CustomError(RES_MSG.SIGNUP_CONFLICT, RESPONSES.CONFLICT);
        }
        const user: any = await AuthService.createUser(req.body);

        if (user && !user.error) {
            return res.status(RESPONSES.CREATED).send({
                status: RESPONSES.CREATED,
                message: RES_MSG.SIGNUP_SUCCESS,
                error: false,
            });
        }

        throw new CustomError(RES_MSG.BADREQUEST, RESPONSES.BADREQUEST);
    } catch (error) {
        logger.error(error, 'Error In signup');

        return res.status(error.status || RESPONSES.INTERNALSERVER).json({
            status: error.status || RESPONSES.INTERNALSERVER,
            error: true,
            message: error.message || RES_MSG.INTERNAL_SERVER_ERROR,
        });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function login(req: Request, res: Response): Promise<any> {
    try {
        const user: PromiseResolve = await AuthService.getUser(req.body);

        const token: string = jwt.sign({ email: user.data?.email }, app.get('secret'), {
            expiresIn: config.tokenExpire,
        });

        return res.status(RESPONSES.CREATED).send({
            status: RESPONSES.SUCCESS,
            logged: true,
            token,
            message: 'Sign in successfull',
        });
    } catch (error) {
        return res.status(RESPONSES.BADREQUEST).send({
            status: error.status || RESPONSES.BADREQUEST,
            error: true,
            message: error.message || 'Something Went Wrong',
        });
    }
}
