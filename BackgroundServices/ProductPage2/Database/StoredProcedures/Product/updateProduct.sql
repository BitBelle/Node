-- USE ProductPage


CREATE OR ALTER PROCEDURE updateProduct(@product_Id VARCHAR(255), @product_Name VARCHAR(255), @product_Description VARCHAR(255), @product_Price INT)
AS
BEGIN

UPDATE Products 
SET product_Name = @product_Name, product_Description = @product_Description, product_Price = @product_Price
WHERE product_Id = @product_Id

END 