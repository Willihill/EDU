BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [login] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [cpf] FLOAT(53) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phone] INT,
    [birthday] DATETIME2,
    [createdAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_login_key] UNIQUE ([login]),
    CONSTRAINT [User_cpf_key] UNIQUE ([cpf]),
    CONSTRAINT [User_email_key] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[University] (
    [id] INT NOT NULL IDENTITY(1,1),
    [companyName] NVARCHAR(1000) NOT NULL,
    [fantasyName] NVARCHAR(1000) NOT NULL,
    [document] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [University_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [University_companyName_key] UNIQUE ([companyName]),
    CONSTRAINT [University_fantasyName_key] UNIQUE ([fantasyName]),
    CONSTRAINT [University_document_key] UNIQUE ([document]),
    CONSTRAINT [University_token_key] UNIQUE ([token])
);

-- CreateTable
CREATE TABLE [dbo].[Admin] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [universityId] INT NOT NULL,
    CONSTRAINT [Admin_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Teacher] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [universityId] INT NOT NULL,
    CONSTRAINT [Teacher_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Course] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [duration] INT NOT NULL,
    [universityId] INT NOT NULL,
    CONSTRAINT [Course_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [Course_name_universityId_key] UNIQUE ([name],[universityId])
);

-- CreateTable
CREATE TABLE [dbo].[CourseSubject] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [courseId] INT NOT NULL,
    CONSTRAINT [CourseSubject_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [CourseSubject_name_courseId_key] UNIQUE ([name],[courseId])
);

-- CreateTable
CREATE TABLE [dbo].[ClassRoom] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] NVARCHAR(1000) NOT NULL,
    [classToken] VARCHAR(max) NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [courseId] INT NOT NULL,
    [coordinatorId] INT NOT NULL,
    CONSTRAINT [ClassRoom_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [ClassRoom_code_courseId_key] UNIQUE ([code],[courseId])
);

-- CreateTable
CREATE TABLE [dbo].[ClassRoomSubject] (
    [id] INT NOT NULL IDENTITY(1,1),
    [semester] INT NOT NULL,
    [classRoomId] INT NOT NULL,
    [courseSubjectId] INT NOT NULL,
    [teacherId] INT NOT NULL,
    CONSTRAINT [ClassRoomSubject_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClassRoomClass] (
    [id] INT NOT NULL IDENTITY(1,1),
    [weekNumber] INT NOT NULL,
    [weekDay] INT NOT NULL,
    [date] DATETIME2 NOT NULL,
    [startAt] NVARCHAR(1000) NOT NULL,
    [endAt] NVARCHAR(1000) NOT NULL,
    [classRoomSubjectId] INT NOT NULL,
    CONSTRAINT [ClassRoomClass_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] INT NOT NULL IDENTITY(1,1),
    [viewAnswer] BIT NOT NULL,
    [deadline] DATETIME2 NOT NULL,
    [startline] DATETIME2 NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [classRoomSubjectId] INT NOT NULL,
    CONSTRAINT [Task_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TaskItem] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [isRequireActive] BIT NOT NULL,
    [typeOptionQuestion] INT NOT NULL,
    [text] NVARCHAR(1000) NOT NULL,
    [number] INT NOT NULL,
    [points] FLOAT(53) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [taskId] INT NOT NULL,
    CONSTRAINT [TaskItem_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TaskItemOption] (
    [id] INT NOT NULL IDENTITY(1,1),
    [letter] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [isCheckedProf] BIT NOT NULL,
    [isCheckedStudent] BIT,
    [taskItemId] INT NOT NULL,
    CONSTRAINT [TaskItemOption_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TaskItemImage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [image] VARCHAR(max) NOT NULL,
    [taskItemId] INT NOT NULL,
    CONSTRAINT [TaskItemImage_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TaskItemResponse] (
    [id] INT NOT NULL IDENTITY(1,1),
    [answer] NVARCHAR(1000),
    [letter] NVARCHAR(1000),
    [taskItemId] INT NOT NULL,
    [studentId] INT NOT NULL,
    CONSTRAINT [TaskItemResponse_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Student] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [classRoomId] INT NOT NULL,
    CONSTRAINT [Student_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StudentInvite] (
    [id] INT NOT NULL IDENTITY(1,1),
    [acceptDate] DATETIME2,
    [cpf] FLOAT(53) NOT NULL,
    [studentId] INT,
    [classRoomId] INT NOT NULL,
    CONSTRAINT [StudentInvite_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [StudentInvite_cpf_key] UNIQUE ([cpf])
);

-- CreateTable
CREATE TABLE [dbo].[TeacherInvite] (
    [id] INT NOT NULL IDENTITY(1,1),
    [acceptDate] DATETIME2,
    [cpf] FLOAT(53) NOT NULL,
    [teacherId] INT,
    [universityId] INT NOT NULL,
    CONSTRAINT [TeacherInvite_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [TeacherInvite_cpf_key] UNIQUE ([cpf])
);

-- AddForeignKey
ALTER TABLE [dbo].[Admin] ADD CONSTRAINT [Admin_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Admin] ADD CONSTRAINT [Admin_universityId_fkey] FOREIGN KEY ([universityId]) REFERENCES [dbo].[University]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Teacher] ADD CONSTRAINT [Teacher_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Teacher] ADD CONSTRAINT [Teacher_universityId_fkey] FOREIGN KEY ([universityId]) REFERENCES [dbo].[University]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_universityId_fkey] FOREIGN KEY ([universityId]) REFERENCES [dbo].[University]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CourseSubject] ADD CONSTRAINT [CourseSubject_courseId_fkey] FOREIGN KEY ([courseId]) REFERENCES [dbo].[Course]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoom] ADD CONSTRAINT [ClassRoom_courseId_fkey] FOREIGN KEY ([courseId]) REFERENCES [dbo].[Course]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoom] ADD CONSTRAINT [ClassRoom_coordinatorId_fkey] FOREIGN KEY ([coordinatorId]) REFERENCES [dbo].[Teacher]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoomSubject] ADD CONSTRAINT [ClassRoomSubject_classRoomId_fkey] FOREIGN KEY ([classRoomId]) REFERENCES [dbo].[ClassRoom]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoomSubject] ADD CONSTRAINT [ClassRoomSubject_courseSubjectId_fkey] FOREIGN KEY ([courseSubjectId]) REFERENCES [dbo].[CourseSubject]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoomSubject] ADD CONSTRAINT [ClassRoomSubject_teacherId_fkey] FOREIGN KEY ([teacherId]) REFERENCES [dbo].[Teacher]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ClassRoomClass] ADD CONSTRAINT [ClassRoomClass_classRoomSubjectId_fkey] FOREIGN KEY ([classRoomSubjectId]) REFERENCES [dbo].[ClassRoomSubject]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Task] ADD CONSTRAINT [Task_classRoomSubjectId_fkey] FOREIGN KEY ([classRoomSubjectId]) REFERENCES [dbo].[ClassRoomSubject]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItem] ADD CONSTRAINT [TaskItem_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[Task]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItemOption] ADD CONSTRAINT [TaskItemOption_taskItemId_fkey] FOREIGN KEY ([taskItemId]) REFERENCES [dbo].[TaskItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItemImage] ADD CONSTRAINT [TaskItemImage_taskItemId_fkey] FOREIGN KEY ([taskItemId]) REFERENCES [dbo].[TaskItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItemResponse] ADD CONSTRAINT [TaskItemResponse_taskItemId_fkey] FOREIGN KEY ([taskItemId]) REFERENCES [dbo].[TaskItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItemResponse] ADD CONSTRAINT [TaskItemResponse_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[Student]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Student] ADD CONSTRAINT [Student_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Student] ADD CONSTRAINT [Student_classRoomId_fkey] FOREIGN KEY ([classRoomId]) REFERENCES [dbo].[ClassRoom]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[StudentInvite] ADD CONSTRAINT [StudentInvite_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[Student]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[StudentInvite] ADD CONSTRAINT [StudentInvite_classRoomId_fkey] FOREIGN KEY ([classRoomId]) REFERENCES [dbo].[ClassRoom]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TeacherInvite] ADD CONSTRAINT [TeacherInvite_teacherId_fkey] FOREIGN KEY ([teacherId]) REFERENCES [dbo].[Teacher]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TeacherInvite] ADD CONSTRAINT [TeacherInvite_universityId_fkey] FOREIGN KEY ([universityId]) REFERENCES [dbo].[University]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
