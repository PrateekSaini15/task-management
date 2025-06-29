CREATE TABLE [User] (

	[Id] INT IDENTITY(1,1) NOT NULL,
	[FirstName] VARCHAR(50) NOT NULL,
	[LastName] VARCHAR(50) NULL,
	[Username] VARCHAR(50) NOT NULL CONSTRAINT [UN_User_Username] UNIQUE,
	[Password]  VARCHAR(100) NOT NULL,
	[Email] VARCHAR(50) NOT NULL,
	[IsActive] BIT NOT NULL,
	[IsDelete] BIT NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL CONSTRAINT [DF_User_CreatedDate] DEFAULT (GETDATE()),
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL,

	CONSTRAINT [PK_User_Id] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_User_CreatedBy_User_Id] FOREIGN KEY ([CreatedBy]) REFERENCES [User]([Id]),
	CONSTRAINT [FK_User_ModifiedBy_User_Id] FOREIGN KEY ([ModifiedBy]) REFERENCES [User]([Id])
);