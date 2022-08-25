# iRacing Weekly Races

## Description

This tool will be used for viewing which races are occuring each week of the season and what time the next available race is starting at. The user can select which cars and tracks they own as well as select which series they want to follow. For this they will need to create an account so their preferences can be saved. Since this will only be used for filtering data, they will only need to provide a username and password. The data is pulled from the iRacing API but updated at the beginning of the season (unless there is an update during the season) so if the data is not up to date, this could be due to data files created not being up to date yet. Feel free to use my retieval files for your own application! Info on how to run and what to expect can be found [here](#data-retrieval). 

## Technologies Used

For this application I used the following technologies:

- React
- NodeJS
- Material UI

## Data retrieval

In order to retrieve the data, you need to have an active iRacing membership. The data is retrieved from the iRacing API and then stored in a corresponding json file for faster reads. This works well because the API only needs to be hit at the beginning of the season so the data will not change too often therefore making the use of a DB for the race data not necessary.

To use my retrieval file:

    npm run calls

**Note**: You will need to install all of the modules found at the top of the file for the file to work correctly. Also, you will need to setup a .env file with the same naming conventions used in the retrievedata.js file (if you want to use other names for the .env variables you can but be sure to change them in the retrievedata.js file). You will also need to update the directories to which the files are being written. (These can be found at the bottom of the retrievedata.js file in the writeDataToFile function call).
