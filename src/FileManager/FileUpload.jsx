import { useContext, useState } from "react";
import { getContract } from "../utils/contract";
import uploadToIPFS from "../utils/ipfs";
import { FileUpdateContext } from "../Context/FileContext";

const FileUpload = () => {
    const [file,setfile] = useState(null);
    const[fileName,setfileName] = useState(null);
    const[status,setstatus] = useState("");
    const triggerFileUpdate = useContext(FileUpdateContext)

    const handleFile = (e) => {
        setfile(e.target.files[0]);
        setfileName(e.target.files[0].name);
    };

    const handleUpload = async () =>{
        try {
            setstatus("Uploading file to IPFS...");
            const CID = await uploadToIPFS(file);
            setstatus("Saving Metadata on Ethereum...")
            const contract = await getContract();
            await contract.uploadFile(CID,fileName);
            setstatus("File Successfully Uploaded!")
            setfile(null);
            document.getElementById("fileInput").value = "";
            triggerFileUpdate();

        } catch (error) {
            console.error("Error uploading file:", error);
            setstatus("Error occurred!");
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-16 ">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">File Upload to IPFS</h1>

    {/* File Upload Section */}
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
      <input
        type="file"
        id="fileInput"
        onChange={handleFile}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleUpload}
        className={`mt-4 w-full px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
          file
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!file}
      >
        {file ? "Upload File" : "Select a File"}
      </button>
      <p className="mt-4 text-gray-600 text-sm">
        <span className="font-semibold">Status:</span> {status}
      </p>
    </div>
  </div>
);
};

export default FileUpload