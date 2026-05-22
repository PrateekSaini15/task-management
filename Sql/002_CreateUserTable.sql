CREATE TABLE [User] (
  [Id] INT IDENTITY(1, 1),
  [FirstName] VARCHAR(100) NOT NULL,
  [LastName] VARCHAR(100) NULL,
  [Username] VARCHAR(100) NOT NULL,
  [Email] VARCHAR(100) NOT NULL,
  [Password] VARCHAR(100) NOT NULL,
  [RoleId] INT NOT NULL,

  CONSTRAINT [PK_User_Id] PRIMARY KEY ([Id]),
  CONSTRAINT [UN_Username] UNIQUE ([Username]),
  CONSTRAINT [UN_Email] UNIQUE ([Email]),
  CONSTRAINT [FK_User_RoleId_Role_Id] FOREIGN KEY ([RoleId]) REFERENCES [Role]([Id])
)
