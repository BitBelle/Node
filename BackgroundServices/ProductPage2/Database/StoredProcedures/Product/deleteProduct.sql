--USE ProductPage

CREATE OR ALTER PROCEDURE deleteProduct (@product_Id VARCHAR(255), @product_Name VARCHAR(255), @product_Description VARCHAR(255), @product_Price INT)
AS
BEGIN

DELETE FROM Products 
WHERE product_Id = @product_Id

END