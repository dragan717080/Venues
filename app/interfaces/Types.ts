import { Prisma } from "@prisma/client";

type AuthVariant = 'LOGIN' | 'REGISTER';

type StringObject = {
  [key: string]: string;
};

type QueryOptions = {
  include: {
    [key: string]: boolean;
  };
  where?: WhereInput;
};

type AccWithTag<T extends string> = {
  [K in T]: boolean;
};

type MongoObjectIDKey = string & { __isMongoObjectIDKey: true };

type MongoItem = MongoObjectIDKey & { additionalProp: string };

type FindArgs = Prisma.UserFindManyArgs | Prisma.UserFindUniqueArgs | Prisma.CityFindManyArgs | Prisma.CityFindUniqueArgs;
type WhereInput = Prisma.UserWhereInput | Prisma.UserWhereUniqueInput | Prisma.CityWhereInput | Prisma.CityWhereUniqueInput;

export type { AuthVariant, StringObject, MongoObjectIDKey, MongoItem, FindArgs, WhereInput, QueryOptions, AccWithTag };
