-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(80) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `location` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
