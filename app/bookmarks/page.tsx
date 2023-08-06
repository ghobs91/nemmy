import { GetPersonDetailsResponse } from "lemmy-js-client";
import { cookies } from "next/dist/client/components/headers";
import { cache } from "react";
import { LemmyHttp, SortType } from "lemmy-js-client";

import BookmarkPage from "@/components/PageComponents/BookmarkPage";

import { getCurrentAccountServerSide } from "@/utils/authFunctions";
import { DEFAULT_INSTANCE } from "@/constants/settings";

const getSaved = cache(
  async ({
    jwt,
    instance,
    username,
  }: {
    jwt?: string;
    instance?: string;
    username: string;
  }): Promise<GetPersonDetailsResponse> => {
    let client: LemmyHttp = new LemmyHttp(
      instance && instance.length > 1 && instance !== "undefined"
        ? `https://${instance}`
        : DEFAULT_INSTANCE,
    );

    return await client.getPersonDetails({
      username: username,
      auth: jwt,
      sort: "Hot",
      page: 1,
      saved_only: true,
    });
  },
);

export const metadata = {
  title: "Bookmarks - Nemmy",
  description: "View your Bookmarks on Nemmy.",
};

export default async function Inbox({}: {}) {
  const cookieStore = cookies();
  const currentAccount = getCurrentAccountServerSide(cookieStore);

  if (!currentAccount) return <></>;

  const saved = await getSaved({
    jwt: currentAccount.jwt,
    instance: currentAccount.instance,
    username: currentAccount.username,
  });

  return (
    <>
      <div className="flex h-full w-full max-w-2xl flex-col gap-4 overflow-y-hidden ">
        <BookmarkPage
          initialGetPersonDetailsResponse={saved}
          currentUser={currentAccount}
        />
      </div>
    </>
  );
}
