import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "ethers";

export const getContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }
    // Request wallet connection
    try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    } catch (err) {
        console.error("Error connecting wallet:", err);
        throw new Error("Failed to connect wallet");
    }
};
