/*
  Warnings:

  - You are about to alter the column `user_id` on the `User_Wishlist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.

*/
-- DropIndex
DROP INDEX `User_Wishlist_user_id_key` ON `User_Wishlist`;

-- AlterTable
ALTER TABLE `User_Wishlist` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User_Wishlist` ADD CONSTRAINT `User_Wishlist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
