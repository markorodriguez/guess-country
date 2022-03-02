import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonNoLink from "../Buttons/ButtonNoLink";
import Image from "next/image";
import Modal from "../Modal/Modal";
import Answer from "../MessagesModal/Answer";

const _ = require("lodash");

export default function Container({ region, username, isNotFinished }: any) {
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


        const allQuestions = [];

        for (let i = 0; i <= 9; i++) {
          const loopedShuffledArray = _.shuffle(curatedArray);
          


          const loopedAndFiltered = loopedShuffledArray.slice(1, loopedShuffledArray.length);


          const questionGame = {
            country: loopedShuffledArray[0].name.common,
            answers: [
              {
                cityName: loopedShuffledArray[0].capital,
              },
              {
                cityName: loopedAndFiltered[i + 1].capital,
              },
              {
                cityName: loopedAndFiltered[i + 2].capital,
              },
              {
                cityName: loopedAndFiltered[i + 3].capital,
              },
            ],
          };

          allQuestions.push(questionGame);
        }

        setQuestions(allQuestions);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ha ocurrido un error");
      });
  }, []);

  const nextQuestion = () => {
    console.log(currentIndex, "currentIndex");

    if(currentIndex+1 >= questions.length){
      alert('Game Over')
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
    if (value === questions[currentIndex].answers[0].cityName[0]) {
      setIsOpen(true);
      setIsRight(true);
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
        />
      ) : (
        <div className="mx-auto  w-5/6 md:w-3/6 text-center">
          <h4 className="font-semibold text-lg text-dark_color">
            Choose the capital of:
          </h4>
          <p className="text-3xl mt-4 mb-8 font-semibold  text-custom_white">
            {" "}
            {questions[currentIndex].country}
          </p>
          <div className="sm:w-4/6 text-lg mx-auto">
            {_.shuffle(questions[currentIndex].answers).map(
              (el: any, index: number) => {
                return (
                  <ButtonNoLink
                    getValue={getValue}
                    value={el.cityName[0]}
                    text={el.cityName[0]}
                    key={index}
                  ></ButtonNoLink>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}
