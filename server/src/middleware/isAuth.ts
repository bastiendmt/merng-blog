import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  //@ts-ignore
  if (!context.req.session.userId) {
    throw new Error("no user authenticated");
  }

  return next();
};
