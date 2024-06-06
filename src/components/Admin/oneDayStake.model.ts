import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection/connection';



/**
 * @export
 * @interface StakePerDay
 * @extends {Document}
 */
export interface IStakePerDayModel extends Document {
    amount: number;    // stake amt
    utility: string,
    date:string;
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
const stakePerDaySchema: Schema = new Schema({
    amount: {
        type: Number,
        require: true,
    },
    utility: {
        type: String,
        require: true,
        enum: ["used", "unused"],
        default: "unused"
    },
    date: {
        type: String,
        require: true
    },
    timestamp:{
        type: Number,
        require: true
      }

}, {
    collection: 'stakePerDayModel',
    timestamps: true,
    versionKey: false,
});


export default connections.db.model<IStakePerDayModel>('stakePerDayModel', stakePerDaySchema);
