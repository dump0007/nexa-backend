import Web3 from 'web3'
import config from "../../config/env"
export const web3Instance = async (chain: string, abi: any, address: any) => {
    try {
        let rpc: any;
        if (chain == 'polygon') {
            rpc = config.NODE_POLYGON_URL;
        }
        const web3Instance: any = new Web3(rpc as string);


        let contractInstance = new web3Instance.eth.Contract(abi, address);
        return contractInstance;

    } catch (error) {
    }

}