import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonNoLink from "../Buttons/ButtonNoLink";
import Image from "next/image";
import Modal from "../Modal/Modal";
import Answer from "../MessagesModal/Answer";

const _ = require("lodash");

export default function Container({
  region,
  right,
  rightCounter,
  username,
  isNotFinished,
  initalizeFinish,
}: any) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [questions, setQuestions]: any = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRight, setIsRight] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    let urlApi;

    if (region === "all") {
      urlApi = `https://restcountries.com/v3.1/${region}?fields=name,capital`;
    } else {
      urlApi = `https://restcountries.com/v3.1/region/${region}?fields=name,capital`;
    }

    axios
      .get(urlApi)
      .then((res) => {
        const curatedArray: any = [];

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].capital.length !== 0) {
            curatedArray.push(res.data[i]);
          }
        }

        const arrayBase = _.shuffle(curatedArray);

        const preguntasUsar = arrayBase.slice(0, 10);
        const arrayLibreDeUsadas = arrayBase.slice(10, arrayBase.length);

        const questionsGame: any = [];

        for (let j = 0; j < preguntasUsar.length; j++) {
          const loopedArray = _.shuffle(arrayLibreDeUsadas);
          const question = {
            question: preguntasUsar[j].name.common,
            options: [
              {
                city: preguntasUsar[j].capital[0],
              },
              {
                city: loopedArray[j].capital[0],
              },
              {
                city: loopedArray[j + 1].capital[0],
              },
              {
                city: loopedArray[j + 2].capital[0],
              },
            ],
          };
          questionsGame.push(question);
        }

        setQuestions(questionsGame);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ha ocurrido un error");
      });
  }, [region]);

  const nextQuestion = () => {
    console.log(currentIndex, "currentIndex");

    if (currentIndex + 1 >= questions.length) {
      initalizeFinish();
      setIsOpen(false);
      isNotFinished(false);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsOpen(false);
    }
  };

  const getValue = (value: any) => {
    if (value === questions[currentIndex].options[0].city) {
      setIsOpen(true);
      setIsRight(true);
      right();
    } else {
      setIsOpen(true);
      setIsRight(false);
    }
  };

  const clickOnBackdrop = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Modal isOpen={isOpen}>
        <Answer
          clickOnBackdrop={clickOnBackdrop}
          nextQuestion={nextQuestion}
          answer={questions[currentIndex]}
          username={username}
          isRight={isRight}
        />
      </Modal>

      {isLoading ? (
        <Image
          placeholder="blur"
          blurDataURL="/img/worried.png"
          src="/img/worried.png"
          width={200}
          height={200}
          alt="worried"
        />
      ) : (
        <div className="mx-auto  w-5/6 md:w-3/6 text-center">
          <h4 className="font-semibold text-lg text-dark_color">
            Choose the capital of:
          </h4>
          <p className="text-3xl mt-4 mb-8 font-semibold  text-custom_white">
            {" "}
            {questions[currentIndex].question}
          </p>
          <div className="sm:w-4/6 text-lg mx-auto">
            {_.shuffle(questions[currentIndex].options).map(
              (el: any, index: number) => {
                return (
                  <ButtonNoLink
                    getValue={getValue}
                    value={el.city}
                    text={el.city}
                    key={index}
                  ></ButtonNoLink>
                );
              }
            )}
            <p className="text-white mt-6">
              Question: {currentIndex + 1} of {questions.length}
            </p>
            <p>Right questions : {rightCounter}</p>
          </div>
        </div>
      )}
    </div>
  );
}
