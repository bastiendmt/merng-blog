import Dataloader from "dataloader";
import { User } from "../entities/User";

//[ 1, 7 , 87, 9]
//[{id: 1, ...user}, ...]
export const createUserLoader = () =>
  new Dataloader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    return userIds.map((userIds) => userIdToUser[userIds]);
  });
