CREATE TABLE [dbo].[Project]
(
	[Id] INT IDENTITY(1,1),
	[Name] VARCHAR(500) NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL CONSTRAINT [DF_Project_CreatedDate] DEFAULT(GETDATE()),
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL,

	CONSTRAINT [PK_Project_Id] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Project_CreatedBy_User_Id] FOREIGN KEY ([CreatedBy]) REFERENCES [User]([Id]),
	CONSTRAINT [FK_Project_ModifiedBy_User_Id] FOREIGN KEY ([ModifiedBy]) REFERENCES [User]([Id])
)
