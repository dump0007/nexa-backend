import AllTxModel, { IAllTxModel } from './model';
import { ITxHistoryService } from './interface';
import { RESPONSES, RES_MSG } from '../../utils/response';
import { ContractMissingDeployDataError } from 'web3';

/**
 * @export
 * @implements {ITxHistoryService}
 */
const TxHistoryService: ITxHistoryService = {


    /**
     * @param {ITxHistoryService} body
     * @returns {Promise <PromiseResolve>}
     * @memberof UserService
     */
    async depositHistory(walletAddress: any, page: any, limit: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);
            const responseCount = await AllTxModel.find({ receiverAddress: walletAddress, event: "Staked" }).sort({ createdAt: -1 })
            let response = await AllTxModel.find({ receiverAddress: walletAddress, event: "Staked" }).sort({ createdAt: -1 }).skip(limitOffset).limit(initialLimit)
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                count: responseCount.length,
                docCount: response.length,
                status: RESPONSES.SUCCESS
            }

        } catch (error) {
            return {
                message: error || RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true
            }
        }
    },



    /**
     * @param {ITxHistoryService} body
     * @returns {Promise <PromiseResolve>}
     * @memberof UserService
     */
    async withdrawHistory(walletAddress: any, page: any, limit: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);
            const responseCount = await AllTxModel.find({ receiverAddress: walletAddress, event: { $in: ["withdrawNexaIncome","withdrawLevelIncome","withdrawROIIncome", "withdrawDirectIncome","lockedRewardsWithdrawn"] } }).sort({ createdAt: -1 })
            let response = await AllTxModel.find({ receiverAddress: walletAddress, event: { $in: ["withdrawNexaIncome","withdrawLevelIncome","withdrawROIIncome", "withdrawDirectIncome","lockedRewardsWithdrawn"] } }).sort({ createdAt: -1 }).skip(limitOffset).limit(initialLimit)
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                count: responseCount.length,
                docCount: response.length,
                status: RESPONSES.SUCCESS
            }

        } catch (error) {
            return {
                message: error || RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true
            }
        }
    },


    /**
     * @param {ITxHistoryService} body
     * @returns {Promise <PromiseResolve>}
     * @memberof UserService
     */
    async claimHistory(walletAddress: any, page: any, limit: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);
            const responseCount = await AllTxModel.find({ receiverAddress: walletAddress, event: { $in: ["claimedLevelIncome", "claimedROIIncome","withdrawNexaIncome"] } }).sort({ createdAt: -1 })
            let response = await AllTxModel.find({ receiverAddress: walletAddress, event: { $in: ["claimedLevelIncome", "claimedROIIncome","withdrawNexaIncome"] }
}).sort({ createdAt: -1 }).skip(limitOffset).limit(initialLimit)
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                count: responseCount.length,
                docCount: response.length,
                status: RESPONSES.SUCCESS
            }

        } catch (error) {
            return {
                message: error || RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true
            }
        }
    },


    async SkippedIncomeHistory(walletAddress: any, page: any, limit: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);
            const responseCount = await AllTxModel.find({ receiverAddress: walletAddress, event: { $in: ["shiftedUnrealisedIncomeToAdmin"] } }).sort({ createdAt: -1 })
            let response = await AllTxModel.find({ receiverAddress: walletAddress, event: { $in: ["shiftedUnrealisedIncomeToAdmin"] }
}).sort({ createdAt: -1 }).skip(limitOffset).limit(initialLimit)
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                count: responseCount.length,
                docCount: response.length,
                status: RESPONSES.SUCCESS
            }

        } catch (error) {
            return {
                message: error || RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true
            }
        }
    },

};


export default TxHistoryService;
