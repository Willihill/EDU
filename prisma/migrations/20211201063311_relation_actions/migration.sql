BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ClassRoomClass] DROP CONSTRAINT [ClassRoomClass_classRoomSubjectId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[StudentInvite] DROP CONSTRAINT [StudentInvite_classRoomId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Task] DROP CONSTRAINT [Task_classRoomSubjectId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TaskItem] DROP CONSTRAINT [TaskItem_taskId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TaskItemImage] DROP CONSTRAINT [TaskItemImage_taskItemId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TaskItemOption] DROP CONSTRAINT [TaskItemOption_taskItemId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TeacherInvite] DROP CONSTRAINT [TeacherInvite_universityId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoomClass] ADD CONSTRAINT [ClassRoomClass_classRoomSubjectId_fkey] FOREIGN KEY ([classRoomSubjectId]) REFERENCES [dbo].[ClassRoomSubject]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Task] ADD CONSTRAINT [Task_classRoomSubjectId_fkey] FOREIGN KEY ([classRoomSubjectId]) REFERENCES [dbo].[ClassRoomSubject]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItem] ADD CONSTRAINT [TaskItem_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[Task]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItemOption] ADD CONSTRAINT [TaskItemOption_taskItemId_fkey] FOREIGN KEY ([taskItemId]) REFERENCES [dbo].[TaskItem]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItemImage] ADD CONSTRAINT [TaskItemImage_taskItemId_fkey] FOREIGN KEY ([taskItemId]) REFERENCES [dbo].[TaskItem]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[StudentInvite] ADD CONSTRAINT [StudentInvite_classRoomId_fkey] FOREIGN KEY ([classRoomId]) REFERENCES [dbo].[ClassRoom]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TeacherInvite] ADD CONSTRAINT [TeacherInvite_universityId_fkey] FOREIGN KEY ([universityId]) REFERENCES [dbo].[University]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
