import Web3 from "web3";
import { web3Instance } from "../helper/web3helper";
import config from "../../config/env";


export const removeNFromBigInt = async (bigIntValue: any) => {
    if (typeof bigIntValue !== 'bigint') {
        throw new Error('Input must be a BigInt');
    }
    const stringValue: any = bigIntValue.toString();
    const stringWithoutN = stringValue.replace('n', '');
    return stringWithoutN;
}



export const userIncome = async (chain: string, abi: any, contractAddress: any, UserAddress: string) => {
    try {
        const instance = await web3Instance(chain, abi,contractAddress)
        let webInstance: any
        if (chain == 'polygon') {
            webInstance = new Web3(config.NODE_POLYGON_URL as string)
        }
        const getAllIncome = await instance.methods.getAllIncome(UserAddress).call()
        let obj = {
            levelIncome: await removeNFromBigInt(getAllIncome[`0`]),
            DirectIncome: await removeNFromBigInt(getAllIncome[`1`]),
            rankIncome: await removeNFromBigInt(getAllIncome[`2`]),
            returnOfInvestmentIncome: await removeNFromBigInt(getAllIncome[`3`]),
            unrealisedIncome: await removeNFromBigInt(getAllIncome[`4`])
        }
        return {
            obj
        }
    } catch (error) {
        return error

    }
}

export const referreeRevenue = async (chain: string, abi: any, contractAddress: any, UserAddress: string) => {
    try {
        const instance = await web3Instance(chain, abi,contractAddress)
        let webInstance: any
        if (chain == 'polygon') {
            webInstance = new Web3(config.NODE_POLYGON_URL as string)
        }
     
        const userDetails :any= await instance.methods.Details(UserAddress).call()
        
        if(userDetails.refereesIncome != null){
            return Number(userDetails.refereesIncome) 
        }
    } catch (error) {
        return error
    }
}
