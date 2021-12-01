/*
  Warnings:

  - Added the required column `message` to the `ClassRoomSubjectMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sendAt` to the `ClassRoomSubjectMessage` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ClassRoomSubjectMessage] ADD [message] VARCHAR(max) NOT NULL,
[sendAt] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
