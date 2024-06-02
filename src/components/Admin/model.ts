import * as bcrypt from 'bcrypt';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as connections from '../../config/connection/connection';



/**
 * @export
 * @interface IncomeFreeze
 * @extends {Document}
 */
export interface IIncomeFreezeModel extends Document {
    receiverAddress: string;    // common for deposit,claim,withdraw
    amount: number;    // common for deposit,claim,withdraw
    timestamp: number,
    userAddress: string;
    depositTime: number;
    transactionHash: string



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
 *       depositTime:
 *          type: number
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const IncomeFreezeSchema: Schema = new Schema({
    userAddress: {
        type: String,
        require: true,
    },
    timestamp: {
        type: Number,
        require: true
    },
    LockDirectIncome: {
        type: Boolean,
        require: true,
        default: false
    },
    LockRankIncome: {
        type: Boolean,
        require: true,
        default: false
    },
    LockROIIncome: {
        type: Boolean,
        require: true,
        default: false
    },
    LockLevelIncome: {
        type: Boolean,
        require: true,
        default: false
    },
    event: {
        type: String,
        require: true,
        enum: ["LockUser"],

    }

}, {
    collection: 'adminTxmodel',
    timestamps: true,
    versionKey: false,
});


export default connections.db.model<IIncomeFreezeModel>('IncomeFreezeModel', IncomeFreezeSchema);
