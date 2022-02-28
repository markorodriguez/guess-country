import type { NextPage } from "next";
import Head from "next/head";

import Image from "next/image";
import Button from "../components/Buttons/Button";

const Home: NextPage = () => {

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

  return (

      <div id="main-page" className="h-screen  text-custom_white">
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
          />
          <h1 className="text-6xl font-semibold text-dark_color">GeoGuess</h1>

          <p className="text-2xl text-center my-4 text-custom_white">
            A <span className="font-semibold">"funny"</span> game to test your
            geography knowledge.
          </p>
          <div className="my-8">
            <div className=" flex w-full flex-col text-xl text-dark_color">
              {buttonRoutes.map((el,index)=>(
                <Button key={index} text={el.text} href={el.href} />
              ))}
            </div>
          </div>
        </div>
      </div>

  );
};

export default Home;
