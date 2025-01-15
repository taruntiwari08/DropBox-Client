import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "ethers";

export const getContract = async () =>{
    const { ethereum } = window;
    if (!ethereum) throw new Error("Ethereum wallet is not connected!");
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length === 0) {
        alert("No accounts connected. Please connect your wallet.");
    }
    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}
