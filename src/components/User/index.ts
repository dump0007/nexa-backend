import { Request, Response } from "express";
import * as Joi from "joi";
import UserService from "./service";
import { RESPONSES, RES_MSG } from "../../utils/response";
import config from "../../config/env";
import * as nexa from "../abis/nexa.json"
import { referreeRevenue, userIncome } from "./contractService";
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function checkUser(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }
    const schema = Joi.object({
      docIdReferrer: Joi.string().required(),
    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const referrer: any = await UserService.checkReferrer(
      validationSchema.value.docIdReferrer
    );

    if (referrer.data != null) {
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: referrer.data,
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

export async function userPortfolio(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }
    const schema = Joi.object({
      walletAddress: Joi.string()
        .required()
        .error(new Error("wrong wallet address")),
    });



    const validationSchema = await schema.validate(req.body);

    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const userData = await UserService.UserPortfolio(validationSchema.value.walletAddress);
    if (userData.data) {
      return res.status(RESPONSES.SUCCESS).send({
        message: RES_MSG.SUCCESS,
        error: false,
        data: userData.data,
        status: RESPONSES.SUCCESS,
      });
    } else {
      return res.status(RESPONSES.BADREQUEST).send({

        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.BADREQUEST,
      });
    }
  } catch (error) {
    return res.status(RESPONSES.BADREQUEST).send({
      message: error || RES_MSG.BADREQUEST,
      status: RESPONSES.BADREQUEST,
      error: true,
    })
   }
}

export async function refrerralList(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }
    const schema = Joi.object({
      walletAddress: Joi.string().trim().required().lowercase(),
      page: Joi.number().required(),
      limit: Joi.number().required(),
    });

    const validationSchema: any = await schema.validate(req.body);

    if (validationSchema?.error) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const userData = await UserService.UserPortfolio(
      validationSchema.value.walletAddress
    );
    if (!userData) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: RES_MSG.BADREQUEST,
        error: true,
        // data: userData,
        status: RESPONSES.BADREQUEST,
      });
    }
    const refereeData: any = await UserService.referreeList(
      validationSchema.value.walletAddress,
      validationSchema.value.page,
      validationSchema.value.limit
    );

    if (!refereeData) {
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: [],
        status: RESPONSES.SUCCESS,
      });
    }
    const eachreferee =await refereeData.data.map(async(e: any)=>{
      // web3 call
      let a = (await referreeRevenue(config.chain, nexa, config.contractAddress , e.walletAddress))
      
      return {
        referree: e.walletAddress, 
        partners: e.countOfReferree,
        revenue: e.totalStaked && e.totalStaked +( await referreeRevenue(config.chain, nexa, config.contractAddress , e.walletAddress))
      }
      // return cal
    })


    return res.status(RESPONSES.SUCCESS).send({
      message: RES_MSG.SUCCESS,
      error: false,
      data: await Promise.all(eachreferee),
      count:refereeData.count,
      docCount: refereeData.docCount,
      status: RESPONSES.SUCCESS,
    });

  } catch (error) {
    return res.status(RESPONSES.BADREQUEST).send({
      message: error || RES_MSG.BADREQUEST,
      status: RESPONSES.BADREQUEST,
      error: true,
    })
  }
}

export async function UserIncome(req: Request, res: Response): Promise<any> {
  try {

    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }
    const schema = Joi.object({
      walletAddress: Joi.string().trim().required().lowercase(),

    });
    const validationSchema: any = await schema.validate(req.body);

    if (validationSchema?.error) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const refereeData = await UserService.countOfReferree(
      validationSchema.value.walletAddress,
    );
    const cal: any = await userIncome(config.chain, nexa, config.contractAddress , validationSchema.value.walletAddress)

    let obj = {
      cal: cal.obj,
      myTeam: refereeData? String(refereeData.data.countOfReferree) : 0
    }

    const incomeArray: any = Object.keys(cal.obj).map((key: any) => {
      return {
        income: key,
        value: cal.obj[key],
        // myTeam: obj.myTeam
      };
    });
    

    if (cal) {
      return res.status(RESPONSES.SUCCESS).send({
        message: RES_MSG.SUCCESS,
        error: false,
        data: incomeArray,
        myTeam: obj.myTeam,
        status: RESPONSES.SUCCESS,
      });
    }
  }
  catch (error) {
    return res.status(RESPONSES.BADREQUEST).send({
      message: error || RES_MSG.BADREQUEST,
      status: RESPONSES.BADREQUEST,
      error: true,
    });
  }
}

export async function levelBreakdown(req: Request, res: Response): Promise<any> {
  try {

    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }
    const schema = Joi.object({
      walletAddress: Joi.string().trim().required().lowercase(),
      level: Joi.number().required(),
      page: Joi.number().required(),
      limit: Joi.number().required(),
    });
    const validationSchema: any = await schema.validate(req.body);

    if (validationSchema?.error) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const cal: any = await UserService.levelBreakDownService(validationSchema.value.walletAddress, validationSchema.value.level, validationSchema.value.page, validationSchema.value.limit)


    if (cal) {
      return res.status(RESPONSES.SUCCESS).send({
        message: RES_MSG.SUCCESS,
        error: false,
        data: cal,
        // myTeam: obj.myTeam,
        status: RESPONSES.SUCCESS,
      });
    }
  }
  catch (error) {
    return res.status(RESPONSES.BADREQUEST).send({
      message: error || RES_MSG.BADREQUEST,
      status: RESPONSES.BADREQUEST,
      error: true,
    });
  }
}

export async function create(req: Request, res: Response): Promise<any>{
  try{
   const data = await UserService.createUser(req.body.walletAddress, req.body.phoneNumber);
    res.status(RESPONSES.SUCCESS).send({
      data: data,
      status: 200,
      error: false
    })
  }
  catch(error){
    res.status(RESPONSES.BADREQUEST).send({
      status: RESPONSES.BADREQUEST,
      error: true
    })
  }
}


