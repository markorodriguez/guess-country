import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonNoLink from "../Buttons/ButtonNoLink"
import Image from "next/image";
const _ = require("lodash");


export default function Container({ region }: any) {

  const [isLoading, setIsLoading] = React.useState(true);
  const [questions, setQuestions]: any = React.useState([]);

  //test el random number generator URGENTE
  
    
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

        const shuffledArray = _.shuffle(curatedArray);
     
        const questionGame = {
          country: shuffledArray[0].name.common,
          answers: [
            {
              cityName: shuffledArray[0].capital,
            },
            {
              cityName:
              shuffledArray[
                  Math.floor(Math.random() * shuffledArray.length + 1)
                ].capital,
            },
            {
              cityName:
              shuffledArray[
                  Math.floor(Math.random() * shuffledArray.length + 1)
                ].capital,
            },
            {
            
              cityName:
                shuffledArray[
                  Math.floor(Math.random() * shuffledArray.length + 1)
                ].capital,
            },
          ],
        };

        setQuestions(questionGame);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ha ocurrido un error");
      });
  }, []);

  const getValue = (value: any) => {

    if(value === questions.answers[0].cityName[0]){
      toast.success("Correcto");
    }else{
      toast.error("Incorrecto");
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {isLoading ?  <Image  placeholder="blur"
            blurDataURL="/img/worried.png"
            src="/img/worried.png"
            width={200}
            height={200} />  : (
        <div className="mx-auto w-5/6 md:w-2/6 text-center">
          <h4 className="font-semibold text-lg text-dark_color">Choose the capital of:</h4> 
          <p className="text-3xl mt-4 mb-8 font-semibold  text-custom_white"> {questions.country}</p> 
          { (_.shuffle(questions.answers)).map((el:any, index:number)=>{
            return <ButtonNoLink getValue={getValue} value={(el.cityName[0])} text={(el.cityName[0])} key={index}></ButtonNoLink> 
          })}
        </div>
      )}
    </div>
  );
}

