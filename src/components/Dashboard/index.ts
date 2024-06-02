import { Request, Response } from "express";
import Web3 from "web3";
import * as Joi from "joi";
import * as jwt from "jsonwebtoken";
import app from "../../config/server/server";
import DashboardService from "./service";
import { RESPONSES, RES_MSG } from "../../utils/response";
import config from "../../config/env";
import logger from "../../utils/logger";
import CustomError from "../../utils/customError";
import { PromiseResolve } from "../../utils/common.interface";
import UserModel from "../User/model";
import checkReferrer from "../User/service";
import { IDashboardService } from "./interface";
import { log } from "console";
import * as nexa from "../abis/nexa.json"
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function cumilativeData(req: Request, res: Response): Promise<any> {
  try {
    const landPageData: any = await DashboardService.landingPageData();
    let data= {
      totalInvestment:Number(landPageData.data.totalInvestment.toLocaleString('fullwide', { useGrouping: false })),
      totalDistribution: Number(landPageData.data.totalDistribution.toLocaleString('fullwide', { useGrouping: false })),
      totalMembers: landPageData.data.totalUsers
    }
    console.log("landPageData=",landPageData,"=======")
    if (landPageData.data != null) {
      const recentDeposits: any = await DashboardService.latestFiveActions();
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: data,
        recentDeposits: recentDeposits.data,
        status: RESPONSES.SUCCESS,
      });
    } else {
      return res.status(RESPONSES.BADREQUEST).send({

        message: RES_MSG.REFERRER_DOES_NOT_EXIST,
        error: true,
        data: null,
        status: RESPONSES.BADREQUEST,
      });
    }
  } catch (error) {
    return res.status(RESPONSES.BADREQUEST).send({

      message: error || RES_MSG.BADREQUEST,
      status: RESPONSES.BADREQUEST,
      error: true,
    });
  }
}




