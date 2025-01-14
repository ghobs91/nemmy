"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import Link from "next/link";
import va from "@vercel/analytics";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    va.track("error", { error: error.message });
  }, [error]);

  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <Card>
        <CardHeader>Something went wrong!</CardHeader>
        <CardBody className="flex flex-col items-center gap-2">
          <Button
            startContent={
              <span className=" material-symbols-outlined">refresh</span>
            }
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          <span>or</span>
          <Link href={""}>
            <Button
              variant="ghost"
              startContent={
                <span className=" material-symbols-outlined">home</span>
              }
            >
              Go back home
            </Button>
          </Link>
        </CardBody>
        <CardBody>
          If this happens again, please{" "}
          <Link
            href={"https://github.com/cr4yfish/nemmy/issues/new/choose"}
            className="a"
          >
            submit an issue
          </Link>{" "}
          or tell me about it on{" "}
          <Link href={"https://nemmy.app/c/nemmy@lemmy.world"} className="a">
            my Lemmy community
          </Link>
          .
        </CardBody>
      </Card>
    </div>
  );
}
