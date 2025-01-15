import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "ethers";

export const getContract = async () => {
    const { ethereum } = window;
    if (!ethereum) throw new Error("Ethereum wallet is not installed!");

    const provider = new Web3Provider(window.ethereum);

    // Request wallet connection
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length === 0) {
            alert("No accounts connected. Please connect your wallet.");
            return;
        }

        const signer = provider.getSigner();
        return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    } catch (err) {
        console.error("Error connecting wallet:", err);
        throw new Error("Failed to connect wallet");
    }
};
