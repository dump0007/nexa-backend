import { promises } from 'dns';
import { PromiseResolve } from '../../utils/common.interface';
import { IAllTxModel } from './model';
import { Request, Response } from "express";


/**
 * @export
 * @interaface ITxHistoryService
 */
export interface ITxHistoryService {

    depositHistory(walletAddress: any, page: any, limit: any): Promise<any>;
    withdrawHistory(walletAddress: any, page: any, limit: any): Promise<any>;
    claimHistory(walletAddress: any, page: any, limit: any): Promise<any>;
    SkippedIncomeHistory(walletAddress: any, page: any, limit: any): Promise<any>;
}