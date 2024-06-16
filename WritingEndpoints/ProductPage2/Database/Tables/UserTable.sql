--CREATE DATABASE ProductPage;

USE ProductPage;

CREATE TABLE Users(
    user_Id VARCHAR(255) PRIMARY KEY,
    user_Name VARCHAR(255) NOT NULL,
    user_Email VARCHAR(255) NOT NULL UNIQUE,
    password_Hash VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0,
    isEmailSent INT DEFAULT 0
);

SELECT * FROM Users;