import axios from "axios"; 
const ipfsGateway = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataAPIKey = import.meta.env.VITE_API_KEY;
const pinataSecretAPIKey = import.meta.env.VITE_API_SECRET;

async function uploadToIPFS(file) {
  const url = ipfsGateway; 

  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: pinataAPIKey,
        pinata_secret_api_key: pinataSecretAPIKey
      },
    });

    console.log("File uploaded to IPFS:", response.data);
    return response.data.IpfsHash; // The CID (Content Identifier) of the uploaded file
  } catch (error) {
    console.error("IPFS upload error:", error);
  }
}

export default uploadToIPFS
