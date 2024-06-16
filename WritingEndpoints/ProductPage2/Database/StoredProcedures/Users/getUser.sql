
USE ProductPage

GO

CREATE OR ALTER PROCEDURE getUser(@user_Email VARCHAR(255))
AS

BEGIN

SELECT * FROM Users 
WHERE user_Email = @user_Email

END