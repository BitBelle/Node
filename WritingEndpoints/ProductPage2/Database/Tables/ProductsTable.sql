--CREATE DATABASE ProductPage;

USE ProductPage;

CREATE TABLE Products(
    product_Id VARCHAR(255) PRIMARY KEY,
    product_Name VARCHAR(255),
    product_Description VARCHAR(255),
    product_Price INT,
    category_Id VARCHAR(255) FOREIGN KEY REFERENCES Categories(category_Id)
);

