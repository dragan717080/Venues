import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { MongoItem, FindArgs, WhereInput } from "@/app/interfaces/types";
import client from "@/app/libs/prismadb";

const getQuery = (relations: string[], where: WhereInput) => {
  const queryOptions: any = {
    include: relations.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {}),
  };

  if (Object.keys(where).length > 0) {
    queryOptions.where = where;
  }

  return queryOptions;
};

const getPrismaData = async <T>(
  queryFunction: (args: FindArgs) => Promise<T>,
  relations: string[] = [],
  where: WhereInput = {}
): Promise<T> => {
  try {
    const queryOptions = getQuery(relations, where);
    const data = await queryFunction(queryOptions);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getPrismaData;
