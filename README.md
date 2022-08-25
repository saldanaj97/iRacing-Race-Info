# iRacing Schedule

## Data retrieval

In order to retrieve the data, you need to have an active iRacing membership. The data is retrieved from the iRacing API and then stored in a corresponding json file for faster reads. This works well because the API only needs to be hit at the beginning of the season so the data will not change too often therefore making the use of a DB for the race data not necessary.

To use my retrieval file:

    npm run calls

**Note**: You will need to install all of the modules found at the top of the file for the file to work correctly. Also, you will need to setup a .env file with the same naming conventions used in the retrievedata.js file (if you want to use other names for the .env variables you can but be sure to change them in the retrievedata.js file). You will also need to update the directories to which the files are being written. (These can be found at the bottom of the retrievedata.js file in the writeDataToFile function call).
