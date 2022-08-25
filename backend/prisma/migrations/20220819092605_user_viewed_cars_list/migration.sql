-- CreateTable
CREATE TABLE `Users_Viewed_Cars` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `model_id` VARCHAR(300) NULL,
    `complectation_id` VARCHAR(300) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users_Viewed_Cars` ADD CONSTRAINT `Users_Viewed_Cars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Viewed_Cars` ADD CONSTRAINT `Users_Viewed_Cars_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Viewed_Cars` ADD CONSTRAINT `Users_Viewed_Cars_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
