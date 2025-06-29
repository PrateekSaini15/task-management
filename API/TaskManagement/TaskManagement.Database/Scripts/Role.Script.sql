-- Role.Script.sql(Not in build)
/*
This script will add the default roles in the role table.
It is primarly used in the post deployment script where it only get executed if the role table is empty.
*/
BEGIN TRY
	
	BEGIN TRANSACTION;

	SET IDENTITY_INSERT [ROLE] ON;
	
    INSERT INTO ROLE ([Id], [Name], [IsActive], [IsDelete])
    VALUES (1, 'Super Admin', 1, 0)
          ,(2, 'Admin', 1, 0);

	SET IDENTITY_INSERT [ROLE] OFF;
	
    COMMIT;

    PRINT 'Roles added successfully'

END TRY


BEGIN CATCH

    ROLLBACK;

    PRINT ERROR_MESSAGE()

END CATCH