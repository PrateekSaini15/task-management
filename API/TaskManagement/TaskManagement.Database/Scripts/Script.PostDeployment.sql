IF (NOT EXISTS(SELECT * FROM [Role]))
BEGIN
    :r .\Role.Script.sql
END

IF (NOT EXISTS(SELECT * FROM [User]))
BEGIN
    :r .\User.Script.sql
END