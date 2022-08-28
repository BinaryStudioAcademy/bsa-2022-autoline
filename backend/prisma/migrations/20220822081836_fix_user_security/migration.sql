/*
  Warnings:

  - A unique constraint covering the columns `[google_acc_id]` on the table `User_Security` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebook_acc_id]` on the table `User_Security` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User_Security` MODIFY `password` VARCHAR(300) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_Security_google_acc_id_key` ON `User_Security`(`google_acc_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_Security_facebook_acc_id_key` ON `User_Security`(`facebook_acc_id`);
