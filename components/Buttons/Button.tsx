import React from "react";
import Link from "next/link";

export default function Button(props: any) {
  return (
    <button className="my-8 bg">
      <Link href={props.href}>
        <a className="transition-all hover:text-custom_white  font-semibold  bg-dank_yellow border-4 border-dank_yellow hover:bg-transparent px-8  py-3 rounded-2xl">
          {props.text}
        </a>
      </Link>
    </button>
  );
}
