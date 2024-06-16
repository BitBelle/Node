--USE ProductPage

CREATE OR ALTER PROCEDURE addCategory (@category_id VARCHAR(255), @category_Name VARCHAR(255), @category_Description VARCHAR(255))
AS
BEGIN

INSERT INTO Categories(category_id, category_Name, category_Description)
VALUES (@category_id, @category_Name, @category_Description)
END