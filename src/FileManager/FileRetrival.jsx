import React, { useContext, useEffect, useState } from 'react'
import { getContract } from '../utils/contract';
import { FileUpdateContext } from '../Context/FileContext';

function FileRetrival() {
    const[files,setFiles] = useState([]);
    const triggerUpdate = useContext(FileUpdateContext)
      const fetchFiles = async ()=>{
       try {
        const contract = getContract();
        const FilesCount  = await contract.getFileCount()
        const fileArray = [];
        for(let i = 0 ; i< FilesCount; i++){
            const file = await contract.getFile(i);
            fileArray.push({
                cid: file[0],
                fileName: file[1],
                uploader: file[2],
            })
            setFiles(fileArray);
        }
       } catch (error) {
        console.log("Error in Retrieving Files",error);
       }  
    }
    useEffect(() => {
    fetchFiles(); 
    },[triggerUpdate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-80 p-6">
    <h1 className="text-3xl font-bold text-gray-800 mr-4 mb-6">Uploaded Files</h1>
    <ul className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
      {files.length === 0 ? (
        <p className="text-gray-500 text-center">No files uploaded yet.</p>
      ) : (
        files.map((file, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-3 py-3 border-b border-gray-200 last:border-none"
          >
            <a
              href={`https://ipfs.io/ipfs/${file.cid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              {file.fileName}
            </a>
            <span className="text-sm text-gray-600 font-semibold">
              Uploaded by: {file.uploader}
            </span>
          </li>
        ))
      )}
    </ul>
  </div>
);
}


export default FileRetrival