/*
  Warnings:

  - You are about to drop the column `model_id` on the `Users_Viewed_Cars` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Users_Viewed_Cars` DROP FOREIGN KEY `Users_Viewed_Cars_model_id_fkey`;

-- AlterTable
ALTER TABLE `Users_Viewed_Cars` DROP COLUMN `model_id`;
