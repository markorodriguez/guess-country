import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Image from "next/image";
import Button from "../components/Buttons/Button";
import Link from "next/link";

const Home: NextPage = () => {

  const [hide, setHide] = React.useState("");

  const buttonRoutes = [
    {
      text: "Play Game",
      href: "/game"
    },
    {
      text: "Leaderboard",
      href: "/leaderboard"
    }
  ]

  setTimeout(()=>{
    setHide("hidden");
  }, 1500)

  return (
      <div id="main-page" className="h-screen  text-custom_white">

        <div className={"h-screen flex items-center w-full z-20 absolute bg-dank_yellow "+ hide}>
        <div className="loader">Loading...</div>
        </div>

        <Head>
          <title>Geo-Guess</title>
        </Head>
        <div className="flex container mx-auto flex-col items-center justify-center h-full">
          <Image
            placeholder="blur"
            blurDataURL="/img/thinking.png"
            src="/img/thinking.png"
            width={200}
            height={200}
            alt={'thinking_HOME'}
          />
          <h1 className="text-3xl md:text-6xl font-semibold text-dark_color">GeoGuess</h1>

          <p className="text-xl md:text-2xl text-center my-4 text-custom_white">
            A <span className="font-semibold">{`"funny"`}</span> game to test your
            geography knowledge.
          </p>
          <div className="my-8">
            <div className=" flex w-full flex-col text-xl text-dark_color">
              {buttonRoutes.map((el,index)=>(
                <Button key={index} text={el.text} href={el.href} />
              ))}
            </div>
          </div>
          <div className="absolute bottom-3">
          Coded by <Link href="https://github.com/markorodriguez"><a className="underline underline-offset-4">Marko</a></Link> 
        </div>
        </div>
        
      </div>

  );
};

export default Home;
