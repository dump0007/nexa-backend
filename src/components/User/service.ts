import UserModel, { IUserModel } from "./model";
// import levelAgmodel from './levelIncome.model';
import { IUserService } from "./interface";
import { RESPONSES, RES_MSG } from "../../utils/response";
import { Request, Response } from "express";
import Joi from "joi";
import config from "./../../config/env/index";
import { PromiseResolve } from "../../utils/common.interface";
import { ObjectId } from "mongodb";
import otpModel from "../Admin/otpModel";
import allTxModel, { IAllTxModel } from '../TransactionHistory/model';
import levelIncomeModel from "./levelIncome.model";

/**
 * @export
 * @implements {IUserService}
 */
const UserService: IUserService = {
  /**
   * @param {IUserModel} body
   * @returns {Promise <PromiseResolve>}
   * @memberof UserService
   */
  async checkReferrer(docIdReferrer: any): Promise<PromiseResolve> {
    try {
      const referrer = await UserModel.findOne({ _id: docIdReferrer });
      return {
        message: RES_MSG.SUCCESS,
        error: false,
        data: referrer,
        status: RESPONSES.SUCCESS,
      };
    } catch (error) {
      return {
        message: error || RES_MSG.BADREQUEST,
        status: RESPONSES.BADREQUEST,
        error: true,
      };
    }
  },

  /**
   * @param {IUserModel} body
   * @returns {Promise <PromiseResolve>}
   * @memberof UserService
   */
  async UserPortfolio(walletAddress: any): Promise<PromiseResolve> {
    try {
      const userData = await UserModel.findOne({
        walletAddress: walletAddress.toLowerCase(),
      });
      if (!userData) {
        return {
          message: RES_MSG.BADREQUEST,
          status: RESPONSES.BADREQUEST,
          error: true,
        };
      }
      return {
        message: RES_MSG.SUCCESS,
        error: false,
        data: userData,
        status: RESPONSES.SUCCESS,
      };
    } catch (error) {
      return {
        message: error || RES_MSG.BADREQUEST,
        status: RESPONSES.BADREQUEST,
        error: true,
      };
    }
  },

  async levelBreakDownService(
    walletAddress: any,
    level: any,
    page: any,
    limit: any
  ): Promise<any> {
    try {
      let initialPage = page ? page : 1;
      let initialLimit = limit ? limit : 10;
      let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);
      const userData: any = await UserModel.findOne({
        walletAddress: walletAddress.toLowerCase(),
      });
      // console.log(userData);
      
      if (!userData) {
        return {
          message: RES_MSG.BADREQUEST,
          status: RESPONSES.BADREQUEST,
          error: true,
        };
      }
      const levelData = userData?.level[`lvl${level}`];
      const data = levelData.slice(limitOffset, initialPage * initialLimit);
      let final:any=[];
      if(data && data.length>0)
      {
        for(let g=0;g<data.length;g++){
          const xi:any = await allTxModel.find({
            receiverAddress: data[g].toLowerCase(),
            event:"Staked"
          });
          // console.log("xi",xi)
          let amt=0;
          if(xi && xi.length>0){
            for(let i=0;i<xi.length;i++){
              // console.log("xi[i]",xi[i])
              amt = amt+ Number(xi[i].amt)
              // console.log("amt",amt)
            }
          }
          const obj = {
            walletAddress: data[g].toLowerCase(),
            amount:amt
          }
          // console.log("obj",obj)
          await final.push(obj);
        }
        
    }
      // const refereeDataCount = await levelAgmodel.find({ receiver: walletAddress.toLowerCase(),levelNumber : level  }).sort({ createdAt: -1 })
      // const refereeData = await levelAgmodel.aggregate([
      //     {
      //         $match: {
      //             receiver: walletAddress.toLowerCase(),
      //             levelNumber: level
      //         }
      //     },
      //     {
      //         $sort: {
      //             createdAt: -1
      //         }
      //     },
      //     {
      //         $skip: limitOffset
      //     },
      //     {
      //         $limit: initialLimit
      //     },
      //     {
      //         $lookup: {
      //             from: 'userModel', // Name of the collection in the other schema
      //             localField: 'sender', // Field in the current schema to match with (assuming userId field)
      //             foreignField: 'walletAddress', // Field in the other schema to match with
      //             as: 'user_data' // Name of the field to store joined user data
      //         }
      //     },
      //     { $unwind: "$user_data" },
      //     {
      //       $project: {
      //         _id: 0,
      //         totalStaked: "$user_data.totalStaked",
      //         sender: 1,
      //         receiver: 1,
      //         partialAmount: 1,
      //         amt: 1,
      //         levelNumber: 1,
      //         timestamp: 1,
      //         transactionHash: 1,
      //         event: 1
      //       },}
      //     // Add more stages as needed for your aggregation
      // ])
      // console.log("final",final)
      return {
        message: RES_MSG.SUCCESS,
        error: false,
        data: final,
        count: levelData.length,
        docCount: data.length,
        status: RESPONSES.SUCCESS,
      };
    } catch (error) {
      return {
        message: error || RES_MSG.BADREQUEST,
        status: RESPONSES.BADREQUEST,
        error: true,
      };
    }
  },

  /**
   * @param {IUserModel} body
   * @returns {Promise <PromiseResolve>}
   * @memberof UserService
   */
  async referreeList(walletAddress: any, page: any, limit: any): Promise<any> {
    try {
      const userData = await UserModel.findOne({
        walletAddress: walletAddress,
      });
      if (!userData) {
        return {
          message: RES_MSG.BADREQUEST,
          error: true,
          data: null,
          status: RESPONSES.BADREQUEST,
        };
      }
      let initialPage = page ? page : 1;
      let initialLimit = limit ? limit : 10;
      let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);
      const refereeDataCount = await UserModel.find({
        referrerAddress: walletAddress,
      }).sort({ createdAt: -1 });
      const refereeData = await UserModel.find({
        referrerAddress: walletAddress,
      })
        .sort({ createdAt: -1 })
        .skip(limitOffset)
        .limit(initialLimit);
      if (!refereeData) {
        return {
          message: RES_MSG.SUCCESS,
          error: false,
          data: [],

          status: RESPONSES.SUCCESS,
        };
      }
      return {
        message: RES_MSG.SUCCESS,
        error: false,
        data: refereeData,
        count: refereeDataCount.length,
        docCount: refereeData.length,
        status: RESPONSES.SUCCESS,
      };
    } catch (error) {
      return {
        message: error || RES_MSG.BADREQUEST,
        status: RESPONSES.BADREQUEST,
        error: true,
      };
    }
  },

  /**
   * @param {IUserModel} body
   * @returns {Promise <PromiseResolve>}
   * @memberof UserService
   */

  async countOfReferree(walletAddress: any): Promise<PromiseResolve> {
    try {
      const refereeData = await UserModel.findOne({
        walletAddress: walletAddress,
      });
      if (!refereeData) {
        return {
          message: RES_MSG.BADREQUEST,
          error: true,
          status: RESPONSES.BADREQUEST,
        };
      }
      return {
        message: RES_MSG.SUCCESS,
        error: false,
        data: refereeData,
        status: RESPONSES.SUCCESS,
      };
    } catch (error) {
      return {
        message: error || RES_MSG.BADREQUEST,
        status: RESPONSES.BADREQUEST,
        error: true,
      };
    }
  },

  async createUser(
    walletAddress: any,
    phoneNumber: any
  ): Promise<PromiseResolve> {
    try {
      let verification = await otpModel.findOneAndUpdate(
        {
          userAddress: walletAddress.toLowerCase(),
          phoneNumber: phoneNumber,
          validation: false,
        },
        {
          $set: {
            validation: true,
          },
        },
        {
          returnOriginal: false,
        }
      );
      if (!verification) {
        return {
          message: RES_MSG.BADREQUEST,
          error: true,
          status: RESPONSES.BADREQUEST,
        };
      }
      let fetchUser = await UserModel.findOne({ walletAddress: walletAddress });
      let userData;
      if (fetchUser) {
        let personalLink: any;
        // if(phoneNumber == "+918550862915"){
        //     personalLink = `https://${config.hostName}/admin/${fetchUser._id}`
        // }else{
        personalLink = `https://${config.hostName}/dashboard/funds/${fetchUser._id}`;
        // }
        userData = await UserModel.findOneAndUpdate(
          { walletAddress: walletAddress },
          { $set: { phoneNumber: phoneNumber, referralLink: personalLink } },
          { returnOriginal: false }
        );
      } else {
        let newObjectId = new ObjectId();
        let personalLink: any = `https://${config.hostName}/dashboard/funds/${newObjectId}`;
        userData = await UserModel.create({
          _id: newObjectId,
          walletAddress: walletAddress.toLowerCase(),
          referralLink: personalLink,
          nexaRank: 0,
          countOfReferree: 0,
          claimableAmount: 0,
          totalStaked: 0,
          phoneNumber: phoneNumber,
        });
      }

      return {
        message: RES_MSG.SUCCESS,
        error: false,
        data: userData,
        status: RESPONSES.SUCCESS,
      };
    } catch (error) {
      return {
        message: error.message || RES_MSG.BADREQUEST,
        error: true,
        status: RESPONSES.BADREQUEST,
      };
    }
  },
};

export default UserService;
