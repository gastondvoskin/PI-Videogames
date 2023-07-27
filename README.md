## Overview
https://www.youtube.com/watch?time_continue=1&v=trnyhUCFNfE&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=Mjg2NjY&feature=emb_logo&ab_channel=Gast%C3%B3nDvoskin
https://youtu.be/trnyhUCFNfE

## Goals of the project
This project was created in 2023 as part of my studies at Soy Henry Bootcamp. These were the goals of the project: 
1. Render videogames
Render videogames from my database and from rawg API. You will see the basic information of each videogame
In the Home component you will see all the videogames from my database and, for performance reasons, the first 150 videogames from rawg.
The results are shown by pages, displaying 15 videogames in each page.
2. Filter and sort
Filter all videogames by name, including my database and the +800.000 from rawg API.
Filter videogames by creator and genres, combining both filters. These filters apply to all my database and the first 150 from rawg API.
Sort the videogame results based on selected criteria: alphabetically or by rating.
Reset all filters to their default settings.
3. View more details
Access detailed information of any videogame, including the complete description, rating, release date, genres, platforms and id.
4. Add a new videogame
Add a new videogame to my database.
The videogame will be created through a form in the Admin section.
Render the added videogame as any of the other ones.


## Used technologies
JavaScript, React, Redux, NodeJS, Express, Sequelize.

## Requisites for local exectution
1. Install PostgreSQL. 
2. Create a Database with the name 'Videogames'.
4. Create an account in rawg API. 
3. Inside ./api directory create a .env file with your credentails, as shown below: 
PORT = 3001 
DB_USER = yourPostgresUser
DB_PASSWORD = yourPostgresPassword
DB_HOST = localhost
DB_PORT = yourDbPort
DB_NAME = videogames 
API_KEY = yorApiKEY
Replace yourPostgresUser, yourPostgresPassword, yourDbPort, yorApiKEY for your own credentials. 

## Instalation
Use npm package to install. 
Inside /api: npm install
Inside /client: npm install

## Local execution
Inside /api: npm start
Inside /client: npm start

## Contact
Thank you for visiting my webpage. If you have any questions or would like to provide feedback, please feel free to contact me via https://www.linkedin.com/in/gaston-dvoskin/