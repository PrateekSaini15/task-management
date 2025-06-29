CREATE TABLE [dbo].[UserRole]
(
    [UserId] INT NOT NULL,
	[RoleId] INT NOT NULL,

	CONSTRAINT [PK_UserRole_UserId_RoleId] PRIMARY KEY ([UserId], [RoleId]),
	CONSTRAINT [FK_UserRole_UserId_User_Id] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]),
	CONSTRAINT [FK_UserRole_RoleId_Role_Id] FOREIGN KEY ([RoleId]) REFERENCES [Role]([Id])
)
