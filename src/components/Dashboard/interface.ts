import { PromiseResolve } from '../../utils/common.interface';


/**
 * @export
 * @interaface IDashboardService
 */
export interface IDashboardService {

    landingPageData(): Promise<PromiseResolve>;
    latestFiveActions(): Promise<PromiseResolve>;
}