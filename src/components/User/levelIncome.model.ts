// let mongoose = require("mongoose");
import * as bcrypt from 'bcrypt';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as connections from '../../config/connection/connection';
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

export interface ILevelModel extends Document {
    sender: string,    
    receiver: string, 
    partialAmount: string,      
    amt: number,   
    levelNumber: number, 
    timestamp: number  
    transactionHash: string  
    event: string 
}

// const levelAgModel = new mongoose.Schema(
const levelAgModel: Schema = new Schema(
  {
    sender: {
      type: String,
      require: true,
    },
    receiver: {
      type: String,
      require: true,
    },
    partialAmount: {
        type: String,
        require: true
    },
    amt: {
        type: Number,
        require: true,
    },
    levelNumber: {
        type: Number,
        require: true
    },
    timestamp: {
        type: Number,
        require: true
    },
    transactionHash: {
        type: String,
        require: true,
      },
    event: {
        type: String,
        require: true,
        enum: ["allocatedLevelIncomeDetailed"],

    }

  },
  {
    collection: "levelAggregateModel",
    timestamps: true,
    versionKey: false,
  }
);
export default connections.db.model<ILevelModel>('levelAggregateModel', levelAgModel);

// export default mongoose.model("levelAggregateModel", levelAgModel);