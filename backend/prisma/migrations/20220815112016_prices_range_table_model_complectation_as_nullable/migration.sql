-- DropForeignKey
ALTER TABLE `Prices_Range` DROP FOREIGN KEY `Prices_Range_complectation_id_fkey`;

-- DropForeignKey
ALTER TABLE `Prices_Range` DROP FOREIGN KEY `Prices_Range_model_id_fkey`;

-- AlterTable
ALTER TABLE `Prices_Range` MODIFY `model_id` VARCHAR(191) NULL,
    MODIFY `complectation_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Prices_Range` ADD CONSTRAINT `Prices_Range_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prices_Range` ADD CONSTRAINT `Prices_Range_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
