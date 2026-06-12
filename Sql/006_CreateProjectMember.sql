GO

CREATE TABLE [ProjectMember]
(
	[ProjectId] INT NOT NULL,
	[UserId] INT NOT NULL,
	[RoleId] INT NOT NULL,
	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedBy] INT NULL,
	[ModifeidDate] DATETIME NULL,

	CONSTRAINT [PK_ProjectMember_ProjectId_UserId] PRIMARY KEY ([ProjectId], [UserId]),
	CONSTRAINT [FK_ProjectMember_ProjectId_Project_Id] FOREIGN KEY ([ProjectId]) REFERENCES [Project]([Id]),
	CONSTRAINT [FK_ProjectMember_UserId_User_Id] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]),
	CONSTRAINT [FK_ProjectMember_RoleId_ProjectRole_Id] FOREIGN KEY ([RoleId]) REFERENCES [ProjectRole]([Id])
);