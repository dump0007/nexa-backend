import { Request, Response } from "express";
import * as Joi from "joi";
import adminService from "./service";
import { RESPONSES, RES_MSG } from "../../utils/response";
import userModel from "../User/model";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function fetchLockedIncomes(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }

    const schema = Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
      walletAddress: Joi.string().allow("")
    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    let address = validationSchema.value.walletAddress ? validationSchema.value.walletAddress : null;

    const history: any = await adminService.lockIncomeHistory(
      validationSchema.value.page,
      validationSchema.value.limit,
      address
    );

    if (history.data != null) {
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: history.data,
        count: history.count,
        docCount: history.docCount,
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



// Function to send OTP to a mobile number
export async function sendotp(req: Request, res: Response): Promise<any> {
  try{

    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }

    const schema = Joi.object({
      walletAddress: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    let userDataOTP = await userModel.findOne({phoneNumber: validationSchema.value.phoneNumber})
    if(userDataOTP){
        return res.status(RESPONSES.BADREQUEST).send({
            message: RES_MSG.PHONE_NUMBER_EXISTS,
            error: true,
            status: RESPONSES.BADREQUEST
        })
    }

      const data = await adminService.sendOTPSMS(validationSchema.value.walletAddress,validationSchema.value.phoneNumber);
      if(data != null && data.error != true){

        res.status(RESPONSES.SUCCESS).send({
          message: RES_MSG.SUCCESS,
          error: false,
          data: data,
          status: RESPONSES.SUCCESS
        })
      }
      else{
        res.status(RESPONSES.BADREQUEST).send({
          message: data.message,
          error: true,
          status: RESPONSES.BADREQUEST
        })
      }
    }
    catch(error){
      return res.status(RESPONSES.BADREQUEST).send({

        message: error || RES_MSG.BADREQUEST,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
}


export async function verifyOtp(req: Request, res: Response): Promise<any>{
  try{

    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }

    const schema = Joi.object({
      walletAddress: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      otp: Joi.number().required()
    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }

    let verification = await adminService.validateData(validationSchema.value.walletAddress, validationSchema.value.phoneNumber, validationSchema.value.otp)
    if(verification.error == true){
      return res.status(RESPONSES.BADREQUEST).send({
        message: verification.message,
        status: RESPONSES.BADREQUEST,
        error: true
      })
    }
    return res.status(RESPONSES.SUCCESS).send({
      status: RESPONSES.SUCCESS,
      error: false,
      data: verification.data
    })
  }
  catch(error){
    return res.status(RESPONSES.BADREQUEST).send({
      message: error || RES_MSG.BADREQUEST,
      status: RESPONSES.BADREQUEST,
      error: true,
    });
  }
}

export async function unlockedIncomePerUser(req: Request, res: Response): Promise<any>{
  try{
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }
    const schema = Joi.object({
      walletAddress: Joi.string().required()
    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    let response = await adminService.UnlockedIncome(validationSchema.value.walletAddress)
    return res.status(RESPONSES.SUCCESS).send({
      status: RESPONSES.SUCCESS,
      error: false,
      data: response.data
    })
  }
  catch(error){
    return res.status(RESPONSES.BADREQUEST).send({
      message: error || RES_MSG.BADREQUEST,
      status: RESPONSES.BADREQUEST,
      error: true,
    });
  }
}



