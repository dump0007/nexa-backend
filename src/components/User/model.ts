import * as bcrypt from "bcrypt";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";
import * as connections from "../../config/connection/connection";

// export type AuthToken = {
//     accessToken: string,
//     kind: string,
// };

// /**
//  * @export
//  * @interface IUserModel
//  * @extends {Document}
//  */
// export interface IUserModel extends Document {
//     email: string;
//     password: string;
//     comparePassword: (password: string) => Promise<boolean>;
// }

export interface IUserModel extends Document {
  walletAddress: string; //user wallet address
  referralLink: string; // user  referral link
  nexaRank: number; // acc to platform
  countOfReferree: number; // number of referral
  referrerAddress: string; // parent address
  totalStaked: number; // amount staked by the user
  claimableAmount: number; // amount claimed by the user
}

/**
 * @swagger
 * components:
 *  schemas:
 *    userSchema:
 *      required:
 *        - walletAddress
 *        - link
 *        - nexaRank
 *        - countOfReferree
 *        - referrerAddress
 *        - totalStaked
 *        - claimableAmount
 *
 *      properties:
 *        id:
 *          type: string
 *        walletAddress:
 *          type: string
 *        link:
 *          type: string
 *        nexaRank:
 *          type: number
 *        countOfReferree:
 *          type: number
 *        referrerAddress:
 *          type: string
 *        totalStaked:
 *          type: number
 *        claimableAmount:
 *          type: number
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/userSchema'
 */
const userSchema: Schema = new Schema(
  {
    walletAddress: {
      type: String,
      require: true,
      unique: true,
      // validate: {
      //     validator: (v: any) => v.length = 42,
      //     message: (props: any) => `${props?.value} is not a valid Wallet address`,
      // }
    },
    referralLink: {
      type: String,
      require: true,
    },
    nexaRank: {
      type: Number,
      require: true,
    },
    countOfReferree: {
      type: Number,
      require: true,
    },
    referrerAddress: {
      type: String,
      require: true,
    },
    totalStaked: {
      type: Number,
      require: true,
    },
    claimableAmount: {
      type: Number,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
    level: {
      type: {
        lvl0: [{ type: String }],
        lvl1: [{ type: String }],
        lvl2: [{ type: String }],
        lvl3: [{ type: String }],
        lvl4: [{ type: String }],
        lvl5: [{ type: String }],
        lvl6: [{ type: String }],
        lvl7: [{ type: String }],
        lvl8: [{ type: String }],
        lvl9: [{ type: String }],
        lvl10: [{ type: String }],
        lvl11: [{ type: String }],
        lvl12: [{ type: String }],
        lvl13: [{ type: String }],
        lvl14: [{ type: String }],
        lvl15: [{ type: String }],
        lvl16: [{ type: String }],
      },
      default: {
        lvl0: [],
        lvl1: [],
        lvl2: [],
        lvl3: [],
        lvl4: [],
        lvl5: [],
        lvl6: [],
        lvl7: [],
        lvl8: [],
        lvl9: [],
        lvl10: [],
        lvl11: [],
        lvl12: [],
        lvl13: [],
        lvl14: [],
        lvl15: [],
        lvl16: [],
      },
    },
  },
  {
    collection: "userModel",
    timestamps: true,
    versionKey: false,
  }
);

export default connections.db.model<IUserModel>("userModel", userSchema);
