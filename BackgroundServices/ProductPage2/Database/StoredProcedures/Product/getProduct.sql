CREATE OR ALTER PROCEDURE getProduct 
    @product_Id VARCHAR(255)
AS
BEGIN
    SELECT * FROM Products 
    WHERE product_Id = @product_Id
END
