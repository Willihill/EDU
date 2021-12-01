/*
  Warnings:

  - A unique constraint covering the columns `[cpf,classRoomId]` on the table `StudentInvite` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[StudentInvite] DROP CONSTRAINT [StudentInvite_cpf_key];

-- CreateIndex
CREATE UNIQUE INDEX [StudentInvite_cpf_classRoomId_key] ON [dbo].[StudentInvite]([cpf], [classRoomId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
