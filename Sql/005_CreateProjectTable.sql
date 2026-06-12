GO

CREATE TABLE [Project]
(
	[Id] INT IDENTITY(1, 1),
	[Name] VARCHAR(100) NOT NULL,
	[StatusId] INT NOT NULL,
	[IsDeleted] BIT NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedBy] INT NULL,
	[ModifiedDate] DATETIME NULL,

	CONSTRAINT [PK_Project_Id] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Project_StatusId_ProjectStatus_Id] FOREIGN KEY ([StatusId]) REFERENCES [ProjectStatus]([Id]),
  CONSTRAINT [UN_Project_Name] UNIQUE ([Name]),
);
