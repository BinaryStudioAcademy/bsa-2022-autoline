/**
 * In long-running applications, we need to
 * create one instance of PrismaClient and re-use it across our application
 *
 * http://surl.li/cjyyi
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
