import React, { FC, ReactElement } from "react";
import { useRouter } from "next/router";
import { trim } from "lodash";

export type WhpptLinkData = {
  type: "page" | "external" | "anchor" | "file";
  text: string;
  href: string;
};

export const WhpptLink: FC<{
  link: WhpptLinkData;
  className?: string;
  editing: boolean;
  children?: ReactElement | ReactElement[] | string;
}> = ({ link, className, children, editing }) => {
  const router = useRouter();

  // TODO: Write tests
  // router.pathname =  ""
  // router.pathname =  "about"
  // router.pathname =  "about/who-we-are"
  // link.href =        "about/who-we-are"

  const linkHref = trim(link.href, "/");
  const pathname = trim(router.pathname, "/");
  return (
    <a
      href={link.href}
      onClick={editing ? (e) => e.preventDefault() : undefined}
      className={[
        router.pathname == link.href ? "exact-active" : "",
        linkHref.startsWith(pathname) && pathname !== "" ? "active" : "",
        className || "",
      ].join(" ")}
    >
      {children || ""}
    </a>
  );
};
