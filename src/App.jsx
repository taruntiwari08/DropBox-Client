import React from 'react'
import './App.css'
import './index.css'
import FileUpload from './FileManager/FileUpload'
import FileRetrival from './FileManager/FileRetrival'
import { FileProvider } from './Context/FileContext'


function App() {

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 p-6'>
    <h1 className='text-4xl font-bold pt-6 mr-5'> DropBox Dapp </h1>
    <FileProvider>
    < FileUpload/>
    <FileRetrival/>
    </FileProvider>

    </div>
  )
}

export default App
