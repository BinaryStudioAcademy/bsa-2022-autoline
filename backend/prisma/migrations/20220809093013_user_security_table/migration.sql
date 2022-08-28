/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the column `photo_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`,
    ADD COLUMN `photo_url` VARCHAR(300) NULL,
    ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    ADD COLUMN `sex` ENUM('male', 'female', 'not_known', 'not_appliable') NOT NULL DEFAULT 'not_known';

-- CreateTable
CREATE TABLE `User_Security` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(300) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `password_change_token` VARCHAR(300) NULL,
    `email_activation_token` VARCHAR(300) NULL,
    `email_change_token` VARCHAR(300) NULL,
    `email_provisional` VARCHAR(300) NULL,
    `refresh_token` VARCHAR(300) NULL,
    `google_acc_id` VARCHAR(300) NULL,
    `facebook_acc_id` VARCHAR(300) NULL,

    UNIQUE INDEX `User_Security_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Security` ADD CONSTRAINT `User_Security_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
