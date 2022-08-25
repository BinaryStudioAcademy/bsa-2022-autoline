CREATE USER IF NOT EXISTS 'autoline_user'@'%' IDENTIFIED BY 'autoline_user';
GRANT ALL PRIVILEGES ON *.* TO 'autoline_user'@'%';
FLUSH PRIVILEGES;
