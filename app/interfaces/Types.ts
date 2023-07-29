type AuthVariant = 'LOGIN' | 'REGISTER';

type StringObject = {
    [key: string]: string;
};

type MongoObjectIDKey = string & { __isMongoObjectIDKey: true };

type MongoItem = MongoObjectIDKey & { additionalProp: string };

type FindArgs = Prisma.UserFindManyArgs | Prisma.UserFindUniqueArgs | Prisma.CityFindManyArgs | Prisma.CityFindUniqueArgs;
type WhereInput = Prisma.UserWhereInput | Prisma.CityWhereInput;

export { AuthVariant, StringObject, MongoObjectIDKey, MongoItem, FindArgs, WhereInput };
