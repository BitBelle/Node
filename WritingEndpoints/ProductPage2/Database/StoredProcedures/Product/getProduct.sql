--USE ProductPage

CREATE OR ALTER PROCEDURE getProduct (
    @product_Id VARCHAR(255), 
    @product_Name VARCHAR(255), 
    @product_Description VARCHAR(255), 
    @product_Price INT)
AS
BEGIN

SELECT * FROM Products 
WHERE product_Id = @product_Id

END