CREATE OR ALTER PROCEDURE addProduct (
    @product_Id VARCHAR(255), 
    @product_Name VARCHAR(255), 
    @product_Description VARCHAR(255),
    @product_Price INT,
    @category_Id VARCHAR(255)
    )

AS
BEGIN

INSERT INTO Products(product_Id, product_Name,
 product_Description, product_Price, category_Id)
VALUES (@product_Id, @product_Name, 
@product_Description,@product_Price ,@category_Id)
END