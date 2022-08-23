-- DropForeignKey
ALTER TABLE `User_Security` DROP FOREIGN KEY `User_Security_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `User_Security` ADD CONSTRAINT `User_Security_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
