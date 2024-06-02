import UserModel, { IUserModel } from '../User/model';
import allTxModel, { IAllTxModel } from '../TransactionHistory/model';
import { IDashboardService } from './interface';
import { RESPONSES, RES_MSG } from '../../utils/response';
import { Request, Response } from "express";
import Joi from "joi";
import config from "./../../config/env/index"
import { PromiseResolve } from '../../utils/common.interface';

/**
 * @export
 * @implements {IDashboardService}
 */
const DashboardService: IDashboardService = {

    /**
     * @returns {Promise <PromiseResolve>}
     * @memberof DashboardService
     */
    async landingPageData(): Promise<PromiseResolve> {
        try {
            const totalUserBase = await UserModel.countDocuments()

            const totalInvestment = await UserModel.aggregate([
                {
                  $group: {
                    _id: null,
                    totalInvestment: { $sum: {$toDouble: "$totalStaked"} }
                  }
                }
              ])

              const totalDistributed = await allTxModel.aggregate([
                 {  
                    $match: {
                      $or: [
                        {
                          event: "withdrawNexaIncome"
                        },
                        {
                          event: "withdrawDirectIncome",
                        },
                        {
                          event: "withdrawLevelIncome",
                        },
                        {
                          event: "withdrawROIIncome",
                        }
                    ]
                    }
                 },
                 {
                    $group: {
                        _id: null,
                        totalDistribution: {$sum: {$toDouble: "$amount"}}

                    }
                 }
              ])
              
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data:  {
                         totalInvestment:totalInvestment[0] ? totalInvestment[0].totalInvestment: 0,
                         totalDistribution: totalDistributed[0] ? totalDistributed[0].totalDistribution : 0,
                         totalUsers: totalUserBase ? totalUserBase : 0
                       },
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
     * @returns {Promise <PromiseResolve>}
     * @memberof DashboardService
     */
    async latestFiveActions(): Promise<PromiseResolve> {
        try {
            const top5 = await allTxModel.find({ event: "Staked" }).sort({ _id: -1 }).limit(5)
            if (!top5) {
                return {
                    message: RES_MSG.BADREQUEST,
                    status: RESPONSES.BADREQUEST,
                    error: true
                }
            }
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: top5,
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


export default DashboardService;
