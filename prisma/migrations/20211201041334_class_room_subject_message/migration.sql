BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ClassRoomSubjectMessage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [classRoomSubjectId] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [ClassRoomSubjectMessage_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoomSubjectMessage] ADD CONSTRAINT [ClassRoomSubjectMessage_classRoomSubjectId_fkey] FOREIGN KEY ([classRoomSubjectId]) REFERENCES [dbo].[ClassRoomSubject]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoomSubjectMessage] ADD CONSTRAINT [ClassRoomSubjectMessage_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
