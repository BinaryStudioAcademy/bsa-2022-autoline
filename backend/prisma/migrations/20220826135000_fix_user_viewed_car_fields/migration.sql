/*
  Warnings:

  - Made the column `model_id` on table `Users_Viewed_Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `complectation_id` on table `Users_Viewed_Cars` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Users_Viewed_Cars` DROP FOREIGN KEY `Users_Viewed_Cars_complectation_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users_Viewed_Cars` DROP FOREIGN KEY `Users_Viewed_Cars_model_id_fkey`;

-- AlterTable
ALTER TABLE `Users_Viewed_Cars` MODIFY `model_id` VARCHAR(300) NOT NULL,
    MODIFY `complectation_id` VARCHAR(300) NOT NULL;

-- AddForeignKey
ALTER TABLE `Users_Viewed_Cars` ADD CONSTRAINT `Users_Viewed_Cars_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Viewed_Cars` ADD CONSTRAINT `Users_Viewed_Cars_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
