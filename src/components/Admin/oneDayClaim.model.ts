import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection/connection';



/**
 * @export
 * @interface StakePerDay
 * @extends {Document}
 */
export interface IClaimPerDayModel extends Document {
    amount: number;    // withdraw amt
    timestamp:number;
    date:string;
}

const claimPerDaySchema: Schema = new Schema({
    amount: {
        type: Number,
        require: true,
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
    collection: 'claimPerDayModel',
    timestamps: true,
    versionKey: false,
});


export default connections.db.model<IClaimPerDayModel>('claimPerDayModel', claimPerDaySchema);
