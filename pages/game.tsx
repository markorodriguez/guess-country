import React from "react";
import Modal from "../components/Modal/Modal";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import ButtonNoLink from "../components/Buttons/ButtonNoLink";
import Container from "../components/Container/Container";
import Image from "next/image";
import Button from "../components/Buttons/Button";

export default function game() {
  const [username, setUsername] = React.useState("El Pepe");
  const [isOpen, setIsOpen] = React.useState(true);
  const [isNameConfirmed, setIsNameConfirmed] = React.useState(false);
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [chosenRegion, setChosenRegion] = React.useState(" ");
  const [isNotFinished, setIsFinished] = React.useState(true);
  
  
  const regions = [
    {
      name: "The world",
      value: "all",
    },
    {
      name: "Africa",
      value: "africa",
    },
    {
      name: "Asia",
      value: "asia",
    },
    {
      name: "Americas",
      value: "americas",
    },
    {
      name: "Europe",
      value: "europe",
    },
    {
      name: "Oceania",
      value: "oceania",
    },
  ];

  const getRegion = (region: string) => {
    setChosenRegion(region);
    setIsGameStarted(true);
    setIsOpen(false);
  };

  const getIsNotFinished = (isFinished: boolean) => {
    setIsFinished(isFinished);
  }

  return (
    <Layout>
      <Modal isOpen={isOpen}>
        <h2 className="text-3xl font-semibold text-dark_color text-center ">
          GeoGuess
        </h2>
        {isNameConfirmed ? (
          <div className="text-custom_white text-center  ">
            <p className="text-lg my-4">
              Oh, so you are{" "}
              <span className="font-semibold underline underline-offset-8 decoration-4">
                {username}
              </span>
              .
            </p>
            <div className="text-lg text-dark_color">
              <p className="my-4 font-semibold">Choose a region:</p>
              <div className="grid text-dark_color grid-cols-2 w-full">
                {regions.map((el, index) => (
                  <ButtonNoLink
                    key={index}
                    getValue={getRegion}
                    value={el.value}
                    text={el.name}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-center text-lg text-custom_white my-4">
              I want to know your name!
            </p>
            <span className="flex items-center justify-center rounded-lg ">
              <input
                autoComplete="off"
                type="text"
                className="rounded-l-lg outline py-1 bg-custom_white outline-custom_white text-gray-400  focus:outline-dank_yellow placeholder:text-center  text-center"
                value={username}
                maxLength={15}
                placeholder="Type your name"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  if (username.length > 0) {
                    setIsNameConfirmed(true);
                  } else {
                    toast.warning("Please enter your name");
                  }
                }}
                className="py-1 px-2 outline font-semibold outline-dank_yellow rounded-r-lg text-dark_color bg-dank_yellow"
              >
                OK
              </button>
            </span>
          </>
        )}
      </Modal>
      <div
        id="game-page"
        className="min-h-screen flex items-center justify-center"
      >
        {isGameStarted && isNotFinished ? (
          <Container isNotFinished={getIsNotFinished} username={username} region={chosenRegion} />
        ) : <>
              { isGameStarted && !isNotFinished ? <div className="flex w-auto h-full flex-col">
                <Image
                src="/img/thinkinggif.gif"
                alt="thinking"
                width={300}
                height={300}

                placeholder="blur"
                blurDataURL="/img/thinkinggif.gif"
              /> 

              <span className="text-4xl text-center text-dark_color">Game Over</span>

              <p className="text-center my-3 text-lg">Score: <span className="text-custom_white font-semibold">pipipipi</span>  </p>
              
              <div className="text-xl mt-2 flex flex-col w-full text-dank_brown h-auto">
              <Button text="Play again" href="/game"/>
              <Button text="See leaderboard" href="/leaderboard"/>
              </div>
             
              </div> : <p>
                imagen random
              </p> }
        </>
        }
      </div>
    </Layout>
  );
}
