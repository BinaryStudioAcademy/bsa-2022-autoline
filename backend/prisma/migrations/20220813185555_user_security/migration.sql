/*
  Warnings:

  - A unique constraint covering the columns `[email_activation_token]` on the table `User_Security` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_Security_email_activation_token_key` ON `User_Security`(`email_activation_token`);
