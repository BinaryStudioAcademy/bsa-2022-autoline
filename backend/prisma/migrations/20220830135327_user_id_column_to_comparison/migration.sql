/*
  Warnings:

  - Added the required column `user_id` to the `Comparison` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comparison` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comparison` ADD CONSTRAINT `Comparison_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
