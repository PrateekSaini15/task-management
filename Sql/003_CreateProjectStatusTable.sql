GO

CREATE TABLE [ProjectStatus]
(
	[Id] INT IDENTITY(1, 1),
	[Name] VARCHAR(100) NOT NULL,

	CONSTRAINT [PK_ProjectStatus_Id] PRIMARY KEY ([Id])
);

GO

INSERT INTO [ProjectStatus] ([Name])
VALUES ('In Progress'),
	('Complete'),
	('Reopen'),
	('Archive');