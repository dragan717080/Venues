import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

type MongoItem = MongoObjectIDKey & { [key: string]: any; [key: number]: any; };

type FindArgs = Prisma.UserFindManyArgs | Prisma.UserFindUniqueArgs | Prisma.CityFindManyArgs | Prisma.CityFindUniqueArgs;
type WhereInput = Prisma.UserWhereInput | Prisma.UserWhereUniqueInput | Prisma.CityWhereInput | Prisma.CityWhereUniqueInput | Prisma.VenueWhereInput | Prisma.VenueWhereUniqueInput;

type ApiHandler<T = any> = (req: NextRequest | Request, res: NextResponse<T>) => Promise<any>;

export default interface BaseImage {
  name: string;
  img: string;
}

export type { AuthVariant, StringObject, MongoObjectIDKey, MongoItem, FindArgs, WhereInput, QueryOptions, AccWithTag, ApiHandler };
