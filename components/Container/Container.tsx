import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
const _ = require("lodash");

export default function Container({ region }: any) {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        
        let urlApi 

        if(region === "all"){
            urlApi = `https://restcountries.com/v3.1/${region}?fields=name,capital`
        } else {
            urlApi = `https://restcountries.com/v3.1/region/${region}?fields=name,capital`
        }
        
        axios
            .get(
                urlApi
            )
            .then((res) => {

                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].capital[0] != null) {
                        setData((prev): any => [...prev, res.data[i]]);
                    }
                }
                
                const rightAnswer = Math.floor((Math.random() * (data.length-1)) + 1 );

                console.log(rightAnswer);
                setQuestions(res.data[rightAnswer]);

                setIsLoading(false);
            })
            .catch(() => {
                toast.error("Ha ocurrido un error");
            });
    }, []);

    return (
        <div className="h-full w-full flex justify-center items-center">
            {isLoading ? null : (
                <div>
                    {data.map((item: any, index: number) => {
                        return (
                            <p key={index}>
                                {item.name.common} - {item.capital[0]}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
