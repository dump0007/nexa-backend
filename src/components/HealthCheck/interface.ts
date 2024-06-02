import { PromiseResolve } from '../../utils/common.interface';
// import { IUserModel } from './model';

/**
 * @export
 * @interaface IHealthCheckService
 */
export interface IHealthCheckService {
    /**
     * @param {any} params
     * @returns {Promise<PromiseResolve>}
     * @memberof HealthCheckService
     */
    checkServiceHealth(): Promise<PromiseResolve>;
    // /**
    //  * @param {IUserModel} userModel
    //  * @returns {Promise<PromiseResolve>}
    //  * @memberof AuthService
    //  */
    // createUser(userModel: IUserModel): Promise<PromiseResolve>;
    // /**
    //  * @param {IUserModel} userModel
    //  * @returns {Promise<PromiseResolve>}
    //  * @memberof AuthService
    //  */
    // getUser(userModel: IUserModel): Promise<PromiseResolve>;
}
