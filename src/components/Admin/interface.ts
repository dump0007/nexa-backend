import { PromiseResolve } from '../../utils/common.interface';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAdminService {
    /**
     * @param {any} params
     * @returns {Promise<PromiseResolve>}
     * @memberof AdminService
     */
     lockIncomeHistory( page: any, limit: any, walletAddress: any): Promise<PromiseResolve>;
     stakePerDayHistory( page: any, limit: any): Promise<PromiseResolve>;
     withdrawPerDayHistory( page: any, limit: any): Promise<PromiseResolve>;
     UnlockedIncome( walletAddress: any): Promise<any> 
     sendOTPSMS(walletAddress: any,toPhoneNumber: string): Promise<PromiseResolve>;
     validateData(userAddress:any, phoneNumber: any, otp: any): Promise<PromiseResolve>
}
