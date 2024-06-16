USE ProductPage

GO

CREATE OR ALTER PROCEDURE getCategories (
    @id VARCHAR(255), 
    @pName VARCHAR(255), 
    @pDescription VARCHAR(255), @price NUMBER)
AS
BEGIN

