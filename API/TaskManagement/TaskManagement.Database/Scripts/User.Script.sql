-- User.Script.sql(Not in build)
/*
This script will add a super admin user in the user table.
It is primarly used in the post deployment script where it only get executed if the user table is empty.
*/

BEGIN TRY
	
	BEGIN TRANSACTION;

	ALTER TABLE [User]
	DROP CONSTRAINT [FK_User_CreatedBy_User_Id];

	SET IDENTITY_INSERT [User] ON;
	
    INSERT INTO [User] ([Id], [FirstName], [LastName], [Username], [Password], [Email], [IsActive], [IsDelete], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
    VALUES (1, 'Prateek', 'Saini', 'PSaini', 'root@123', 'prateek@saini.com', 1, 0, 1, GETDATE(), NULL, NULL);

	SET IDENTITY_INSERT [User] OFF;
	
	ALTER TABLE [User]
	ADD CONSTRAINT [FK_User_CreatedBy_User_Id] FOREIGN KEY ([CreatedBy]) REFERENCES [User]([Id]);

	INSERT INTO [UserRole] ([UserId], [RoleId])
	VALUES (1, 1);
	
    COMMIT;

    PRINT 'User added successfully'

END TRY


BEGIN CATCH

    ROLLBACK;

    PRINT ERROR_MESSAGE()

END CATCH
