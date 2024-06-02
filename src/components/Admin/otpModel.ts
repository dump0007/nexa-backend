import * as bcrypt from 'bcrypt';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as connections from '../../config/connection/connection';
import { boolean } from 'joi';



/**
 * @export
 * @interface validateOtp
 * @extends {Document}
 */
export interface IvalidateOtpModel extends Document {
    userAddress: string;
    timestamp: number,
    phoneNumber: string,
    otp: number
    validation: boolean
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
const validateOtpSchema: Schema = new Schema({
    userAddress: {
        type: String,
        require: true,
    },
    timestamp: {
        type: Number,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    // otp: {
    //     type: Number,
    //     require: true
    // },
    validation: {
        type: Boolean,
        require: true,
        default: false
    },
    // sid: {
    //     type:String,
    //     require: true,
    //     default: "null"
    // }
}, {
    collection: 'otpValidationmodel',
    timestamps: true,
    versionKey: false,
});


export default connections.db.model<IvalidateOtpModel>('validateOtpSchema', validateOtpSchema);
