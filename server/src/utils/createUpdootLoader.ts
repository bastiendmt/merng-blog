import Dataloader from "dataloader";
import { Updoot } from "../entities/Updoot";

//[ {postId : 5, userId: 10}]
// then return [{postId : 5, userId: 10, value : 1}]
export const createUpdootLoader = () =>
  new Dataloader<{ postId: number; userId: number }, Updoot | null>(
    async (keys) => {
      const updoots = await Updoot.findByIds(keys as any);
      const updootIdsToUpdoots: Record<string, Updoot> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoots[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => updootIdsToUpdoots[`${key.userId}|${key.postId}`]
      );
    }
  );
