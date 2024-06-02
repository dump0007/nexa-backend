import * as bcrypt from "bcrypt";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";
import * as connections from "../../config/connection/connection";

/**
 * @export
 * @interface IAllTxModel
 * @extends {Document}
 */
export interface IAllTxModel extends Document {
  receiverAddress: string; // common for deposit,claim,withdraw
  amount: number; // common for deposit,claim,withdraw
  userAddress: string;
  depositTime: number;
  event: string;
  transactionHash: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - receiverAddress
 *        - amount
 *        - userAddress
 *        - depositTime
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        receiverAddress:
 *          type: string
 *        amount:
 *          type: number
 *        userAddress:
 *          type: string
 *        depositTime:
 *          type: number
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const AllTx: Schema = new Schema(
  {
    receiverAddress: {
      type: String,
      require: true,
      // validate: {
      //     validator: (v: any) => v.length = 42,
      //     message: (props: any) => `${props?.value} is not a valid Wallet address`,
      // }
    },
    amount: {
      type: Number,
      require: true,
    },
    // userAddress: {
    //     type: String,
    //     require: true,
    //     unique: false,

    // },
    timestamp: {
      type: Number,
      require: true,
      default: null,
    },
    transactionHash: {
      type: String,
      require: true,
    },
    event: {
      type: String,
      require: true,
      enum: [
        "Staked",
        "withdrawNexaIncome",
        "claimedLevelIncome",
        "withdrawLevelIncome",
        "withdrawROIIncome",
        "withdrawDirectIncome",
        "claimedROIIncome",
        "shiftedUnrealisedIncomeToAdmin",
        "lockedRewardsWithdrawn",
      ],
    },
  },
  {
    collection: "allTxmodel",
    timestamps: true,
    versionKey: false,
  }
);
AllTx.index(
  { transactionHash: 1, event: 1, receiverAddress: 1 },
  { unique: true }
);

export default connections.db.model<IAllTxModel>("AllTxModel", AllTx);
