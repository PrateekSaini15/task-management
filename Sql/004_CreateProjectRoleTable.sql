GO

CREATE TABLE [ProjectRole]
(
	[Id] INT IDENTITY(1, 1),
	[Name] VARCHAR(100) NOT NULL,

	CONSTRAINT [PK_ProjectRole_Id] PRIMARY KEY ([Id])
);

GO

INSERT INTO [ProjectRole] ([Name])
VALUES ('Tech Lead'),
	('Business Analyst'),
	('Developer'),
	('UI/UX Engineer'),
	('Project Manager'),
	('Client');