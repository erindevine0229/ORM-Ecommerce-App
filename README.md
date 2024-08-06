# ORM-Ecommerce-App

## Description
  This project is a back-end application for retailers/companies to process their ecommerce needs. Node and express.js are used to establish a server, create models and process GET/POST/PUT/DELETE requests via routes. Sequelize is used to sync to the database. The general functionality is to maintain a database of product categories which contain products and are associated with tags.
  
Image of an example GET request:

Image of an example POST request:

## Installation
  Create a .env file to store environment variables of DB_NAME, DB_USER, DB_PASSWORD. Install node modules, create database and run seeds prior to starting server.
  
## Usage
  To use the application, use an API client program like Insomnia. The user can then use the GET requests to obtain information (such as displaying all products/tags/categories or display a specific product/tag/category based on a search parameter being the id). Once the server is listening, open insomnia and use the GET/POST/PUT/DELETE routes with specified URL paths in order to view, add, update or delete products/information.
  
Link to screencastify Demo:

## Credits
Starter code obtained from bootcamp GitLab

## License
[MIT](https://choosealicense.com/licenses/mit/)
