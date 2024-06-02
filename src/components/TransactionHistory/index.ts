import { Request, Response } from "express";
import * as Joi from "joi";
import TxHistoryService from "./service";
import { RESPONSES, RES_MSG } from "../../utils/response";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < any >}
 */
export async function depositTx(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }

    const schema = Joi.object({
      walletAddress: Joi.string().required().lowercase(),
      page: Joi.number().required(),
      limit: Joi.number().required(),

    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const history: any = await TxHistoryService.depositHistory(
      validationSchema.value.walletAddress,
      validationSchema.value.page,
      validationSchema.value.limit
    );

    if (history.data != null) {
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: history,
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


export async function withdrawTx(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }

    const schema = Joi.object({
      walletAddress: Joi.string().required().lowercase(),
      page: Joi.number().required(),
      limit: Joi.number().required(),

    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const history: any = await TxHistoryService.withdrawHistory(
      validationSchema.value.walletAddress,
      validationSchema.value.page,
      validationSchema.value.limit
    );

    if (history.data != null) {
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: history,
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


export async function claimTx(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }

    const schema = Joi.object({
      walletAddress: Joi.string().required().lowercase(),
      page: Joi.number().required(),
      limit: Joi.number().required(),

    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const history: any = await TxHistoryService.claimHistory(
      validationSchema.value.walletAddress,
      validationSchema.value.page,
      validationSchema.value.limit
    );

    if (history.data != null) {
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: history,
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


export async function skippedIncomeTx(req: Request, res: Response): Promise<any> {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.INVALID_REQ,
      };
    }

    const schema = Joi.object({
      walletAddress: Joi.string().required().lowercase(),
      page: Joi.number().required(),
      limit: Joi.number().required(),

    });
    const validationSchema: any = await schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(RESPONSES.BADREQUEST).send({

        message: validationSchema.error.message,
        status: RESPONSES.BADREQUEST,
        error: true,
      });
    }
    const history: any = await TxHistoryService.SkippedIncomeHistory(
      validationSchema.value.walletAddress,
      validationSchema.value.page,
      validationSchema.value.limit
    );

    if (history.data != null) {
      return res.status(RESPONSES.SUCCESS).send({

        message: RES_MSG.SUCCESS,
        error: false,
        data: history,
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



