import { promises } from 'dns';
import { PromiseResolve } from '../../utils/common.interface';
import { IUserModel } from './model';
import { Request, Response } from "express";


/**
 * @export
 * @interaface IUserService
 */
export interface IUserService {

    checkReferrer(docIdReferrer: any): Promise<PromiseResolve>;
    UserPortfolio(walletAddress: any): Promise<PromiseResolve>;
    levelBreakDownService(walletAddress: any, level: any, page: any, limit: any): Promise<PromiseResolve> 
    referreeList(walletAddress: any, page : any, limit : any): Promise<PromiseResolve>;
    countOfReferree(walletAddress: any): Promise<PromiseResolve>;
    createUser(walletAddress: any,phoneNumber: any): Promise<PromiseResolve>;
}