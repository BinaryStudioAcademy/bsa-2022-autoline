-- DropForeignKey
ALTER TABLE `Comparison` DROP FOREIGN KEY `Comparison_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comparisons_Complectations` DROP FOREIGN KEY `Comparisons_Complectations_comparison_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Wishlist` DROP FOREIGN KEY `User_Wishlist_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users_Autoria_Viewed_Cars` DROP FOREIGN KEY `Users_Autoria_Viewed_Cars_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users_Searches_Cars` DROP FOREIGN KEY `Users_Searches_Cars_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users_Viewed_Cars` DROP FOREIGN KEY `Users_Viewed_Cars_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `User_Wishlist` ADD CONSTRAINT `User_Wishlist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Viewed_Cars` ADD CONSTRAINT `Users_Viewed_Cars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Searches_Cars` ADD CONSTRAINT `Users_Searches_Cars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Autoria_Viewed_Cars` ADD CONSTRAINT `Users_Autoria_Viewed_Cars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comparison` ADD CONSTRAINT `Comparison_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comparisons_Complectations` ADD CONSTRAINT `Comparisons_Complectations_comparison_id_fkey` FOREIGN KEY (`comparison_id`) REFERENCES `Comparison`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
