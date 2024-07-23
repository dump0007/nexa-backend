const twilio = require('twilio')
import axios from "axios";
import incomeModel from "./model";
import stakePerDayModel from "./oneDayStake.model";
import withdrawPerDayModel from "./oneDayWithdraw.model";
import claimPerDayModel from "./oneDayClaim.model";
import { IAdminService } from './interface';
import { RESPONSES, RES_MSG } from '../../utils/response';
import otpModel from './otpModel';
import userService from'../User/service'
import config from "../../config/env/index"
/**
 * @export
 * @implements {IAdminService}
 */
const AdminService: IAdminService = {


    /**
     * @param {IAdminService} body
     * @returns {Promise <PromiseResolve>}
     * @memberof AdminService
     */
    async lockIncomeHistory( page: any, limit: any, walletAddress: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);


            // const projection = {
            //     userAddress: 1,
            //     timestamp: 1,
            //     LockDirectIncome: { $cond: [{ $eq: ['$LockDirectIncome', true] }, '$LockDirectIncome', '$$REMOVE'] },
            //     LockRankIncome: { $cond: [{ $eq: ['$LockRankIncome', true] }, '$LockRankIncome', '$$REMOVE'] },
            //     LockROIIncome: { $cond: [{ $eq: ['$LockROIIncome', true] }, '$LockROIIncome', '$$REMOVE'] },
            //     LockLevelIncome: { $cond: [{ $eq: ['$LockLevelIncome', true] }, '$LockLevelIncome', '$$REMOVE'] },
            //     event: 1
            //   };

            const responseCount =await incomeModel.find(
                { $or: [{ LockDirectIncome: true }, { LockRankIncome: true }, { LockROIIncome: true }, { LockLevelIncome: true }] },
                // projection
              ).sort({ updatedAt: -1 })
              let response: any;
            if(walletAddress == null){
              response = await incomeModel.find(
                { $or: [{ LockDirectIncome: true }, { LockRankIncome: true }, { LockROIIncome: true }, { LockLevelIncome: true }] },
                // projection
              ).sort({ updatedAt: -1 }).skip(limitOffset).limit(initialLimit)
            }
            else{
                response = await incomeModel.find(
                    {userAddress: walletAddress,
                        $or: [{ LockDirectIncome: true }, { LockRankIncome: true }, { LockROIIncome: true }, { LockLevelIncome: true }] 
                    },
                    // projection
                  ).sort({ updatedAt: -1 }).skip(limitOffset).limit(initialLimit)
            }
            console.log(response)
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                count: walletAddress? response.length :responseCount.length,
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
    
    async withdrawPerDayHistory( page: any, limit: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);


            const response = await withdrawPerDayModel.find().sort({ timestamp: -1 }).skip(limitOffset).limit(initialLimit)
            const count = await withdrawPerDayModel.find()

            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                docCount: count.length,
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

    async claimPerDayHistory( page: any, limit: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);
            const response = await claimPerDayModel.find().sort({ timestamp: -1 }).skip(limitOffset).limit(initialLimit)
            const count = await claimPerDayModel.find()
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                docCount: count.length,
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

    async stakePerDayHistory( page: any, limit: any): Promise<any> {
        try {
            let initialPage = page ? page : 1;
            let initialLimit = limit ? limit : 10;
            let limitOffset: any = (Number(initialPage) - 1) * Number(initialLimit);


            const response = await stakePerDayModel.find().sort({ timestamp: -1 }).skip(limitOffset).limit(initialLimit)
            const count = await stakePerDayModel.find()


            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
                docCount: count.length,
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

    async UnlockedIncome( walletAddress: any): Promise<any> {
        try {
            let response = await incomeModel.find(
                { userAddress: walletAddress,
                    //  $or: [{ LockDirectIncome: false }, { LockRankIncome: false }, { LockROIIncome: false }, { LockLevelIncome: false }] 
                },
                // projection
              )
            let data= await incomeModel.find({userAddress: walletAddress})
              if(data[0] == null){
                let obj  = [{
                    userAddress: walletAddress,
                    LockDirectIncome: false,
                    LockRankIncome: false,
                    LockROIIncome: false,
                    LockLevelIncome: false
                }]

                return {
                    message: RES_MSG.SUCCESS,
                    error: false,
                    data: obj,
                    status: RESPONSES.SUCCESS
                }
              }
            
            return {
                message: RES_MSG.SUCCESS,
                error: false,
                data: response,
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

    async sendOTPSMS(walletAddress: any, toPhoneNumber: string): Promise<any> {
        try {
            const existingOTP = await otpModel.findOne({userAddress: walletAddress, phoneNumber: toPhoneNumber})
            if(existingOTP && existingOTP.validation != false){
                return{
                    message: "Error sending OTP: validation done",
                    status: RESPONSES.BADREQUEST,
                    error: true
                   }
            }
            // Check if an OTP was generated in the last 1 minutes and not validated yet
            if (existingOTP && Date.now() - existingOTP.timestamp < 1 * 60 * 1000) {
                return{
                    message: "Error sending OTP: Wait 1 minute before receiving OTP ",
                    status: RESPONSES.BADREQUEST,
                    error: true
                   }
            } else {
                    // let a = await axios.get(`https://2factor.in/API/V1/${config.ACCOUNT_SID_TWILIO}/SMS/${toPhoneNumber}/AUTOGEN/`)
                    let draftOTPData: any = {}
                if(existingOTP){
                     draftOTPData = await otpModel.findOneAndUpdate({
                        userAddress: walletAddress.toLowerCase(),
                        validation: false
                    },{
                        $set: {
                            timestamp: Date.now(),
                            phoneNumber: toPhoneNumber,
                        }
                    },{
                        returnOriginal: false
                    })
                }
                else{
                 draftOTPData = await otpModel.create({
                    userAddress: walletAddress.toLowerCase(),
                    timestamp: Date.now(),
                    phoneNumber: toPhoneNumber,
                    validation: false,
            })
        } 
            if(draftOTPData){
                return draftOTPData.timestamp; // Return the OTP for verification purposes
            }
            else{
               return{
                message: "Error sending OTP: DB updation failed",
                status: RESPONSES.BADREQUEST,
                error: true
               }
            }
        
    }
        } catch (error) {
            return {
                message: error.message || RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true
            
        }
        }
    },

    async validateData(walletAddress: any, phoneNumber: any, otpToValidate: any): Promise<any>{
        try{
            let otpData: any=await otpModel.findOne({userAddress: walletAddress.toLowerCase(),phoneNumber: phoneNumber,validation: false})
            if(otpData == null){
                return{
                    message: "Couldn't find otp/ Invalid details provided",
                    status: RESPONSES.BADREQUEST,
                    error: true
                   }
            }
                    // let a = await axios.get(`https://2factor.in/API/V1/${config.ACCOUNT_SID_TWILIO}/SMS/VERIFY3/${phoneNumber}/${otpToValidate}`)
                    // if(a.data.Details == "OTP Mismatch"){
                    //     return{
                    //         message:"Wrong OTP",
                    //         status: RESPONSES.BADREQUEST,
                    //         error: true
                    //        }
                    // }

                    if(otpToValidate != String(123456)){
                        return{
                            message:"Wrong OTP",
                            status: RESPONSES.BADREQUEST,
                            error: true
                           }
                    }

                    let validatedData: any = await userService.createUser(otpData.userAddress.toLowerCase(), otpData.phoneNumber)
                    if(validatedData == null)
                    {
                        return{
                            message:"Couldn't create user data",
                            status: RESPONSES.BADREQUEST,
                            error: true
                           }
                    }
                    return validatedData 
        }catch(error){
            return {
                message: error.message || RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true 
            }   
        }
    }

};


export default AdminService;