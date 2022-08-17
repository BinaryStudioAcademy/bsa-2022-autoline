-- CreateTable
CREATE TABLE `User_Wishlist` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(300) NOT NULL,
    `model_id` VARCHAR(191) NOT NULL,
    `complectation_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_Wishlist_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Wishlist` ADD CONSTRAINT `User_Wishlist_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Wishlist` ADD CONSTRAINT `User_Wishlist_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
