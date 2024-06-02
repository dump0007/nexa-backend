import { IHealthCheckService } from './interface';
import { RESPONSES, RES_MSG } from '../../utils/response';
import { PromiseResolve } from '../../utils/common.interface';

/**
 * @export
 * @implements {IHealthCheckService}
 */
const HealthCheckService: IHealthCheckService = {

    /**
     * @param {any} params
     * @returns {Promise <PromiseResolve>}
     * @memberof HealthCheckService
     */
    async checkServiceHealth(): Promise<PromiseResolve> {
        try {
            return {
                status: RESPONSES.SUCCESS,
                error: false,
                message: RES_MSG.HEALTH_CHECK_SUCCESS,
            };
        } catch (error) {
            return {
                status: error.status || RESPONSES.BADREQUEST,
                error: true,
                message: error.message || RES_MSG.BADREQUEST,
            };
        }
    }
};

export default HealthCheckService;
