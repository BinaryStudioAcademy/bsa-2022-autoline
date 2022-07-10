# By default, to generate migrations, Prisma ORM uses a Shadow Database
# https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#how-the-shadow-database-works
#
# Therefore, it requires the DB user to have permissions to create and destroy databases.
# But the user created by the mariadb:10.7 will have access only to the DB to which it connects
FROM mariadb:latest
COPY ./database/user_privileges.sql /docker-entrypoint-initdb.d/
