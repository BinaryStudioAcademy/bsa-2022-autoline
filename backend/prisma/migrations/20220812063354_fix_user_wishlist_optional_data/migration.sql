-- DropForeignKey
ALTER TABLE `User_Wishlist` DROP FOREIGN KEY `User_Wishlist_complectation_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Wishlist` DROP FOREIGN KEY `User_Wishlist_model_id_fkey`;

-- AlterTable
ALTER TABLE `User_Wishlist` MODIFY `model_id` VARCHAR(191) NULL,
    MODIFY `complectation_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User_Wishlist` ADD CONSTRAINT `User_Wishlist_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Wishlist` ADD CONSTRAINT `User_Wishlist_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
