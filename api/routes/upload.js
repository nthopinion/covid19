require('dotenv').config()

const express = require('express')
const router = express.Router()
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
const azureStorage = require('azure-storage')
//const blobService = azureStorage.createBlobService()
const getStream = require('into-stream')
const containerName = 'images'

const handleError = (err, res) => {
  console.log('Upload error', error)

  res.status(500)
  res.render('error', { error: err })
}

const getBlobName = originalName => {
  console.log('Upload originalName', originalName)

  const identifier = Math.random().toString().replace(/0\./, '') // remove "0." from start of string
  return `${identifier}-${originalName}`
}




router.post('/', uploadStrategy, (req, res) => {
  console.log('-----res-uploadStrategy------', req.file)
  const
    blobName = getBlobName(req.file.originalname)
  const stream = getStream(req.file.buffer)
  const streamLength = req.file.buffer.length

/*   blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
    if (err) {
      handleError(err)
      return
    }

    res.render('success', {
      message: 'File uploaded to Azure Blob storage.'
    })
  }) */
})

module.exports = router
