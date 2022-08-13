-- CreateTable
CREATE TABLE `User_Security` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `password_change_token` VARCHAR(300) NULL,
    `email_activation_token` VARCHAR(300) NULL,
    `email_change_token` VARCHAR(300) NULL,
    `email_provisional` VARCHAR(300) NULL,
    `refresh_token` VARCHAR(300) NULL,
    `google_acc_id` VARCHAR(300) NULL,
    `facebook_acc_id` VARCHAR(300) NULL,

    UNIQUE INDEX `User_Security_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Security` ADD CONSTRAINT `User_Security_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
