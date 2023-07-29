import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { MongoItem, FindArgs, WhereInput } from "@/app/interfaces/types";
import getPrismaData from "@/config/prisma/Query";
import client from "@/app/libs/prismadb";

const getCollection = async (
  col: string,
  relations: string[] = [],
  where: WhereInput = {}
): Promise<MongoItem[]> => {
  return getPrismaData<MongoItem[]>(client[col].findMany, relations, where);
};

const getItem = async (
  col: string,
  relations: string[] = [],
  where: WhereInput = {}
): Promise<MongoItem | null> => {
  return getPrismaData<MongoItem | null>(client[col].findUnique, relations, where);
};

export { getCollection, getItem };
