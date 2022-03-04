import React from "react";
import Image from "next/image";


export default function Answer({ nextQuestion, clickOnBackdrop, isRight, username, answer }: any) {
    return (
        <div className="flex flex-col sm:flex-row w-full items-center px-8 ">
            {isRight ? (
                <>
                    <Image
                        src="/img/right.png"
                        placeholder="blur"
                        blurDataURL="/img/right.png"
                        width={200}
                        height={200}
                        alt={'right'}
                    />
                    <div className="flex text-lg items-center text-center flex-col w-full">
                        <p className="text-3xl my-2  font-semibold text-green-500">
                            Right answer!
                        </p>
                        <p className="text-md font-medium text-custom_white">
                            Well done, <span className="font-semibold">{username}</span>{" "}
                        </p>
                        <p className="my-4 font-medium">
                            The capital of <span className="font-semibold text-custom_white">{answer.question}</span> is{" "}
                            <span className="font-semibold text-custom_white">{answer.options[0].city}.</span>{" "}
                        </p>

                        <button onClick={()=>{
                            clickOnBackdrop();
                            nextQuestion();
                        }} className="transition-all hover:text-custom_white w-5/6 text-center md:w-4/6 text-dank_brown  mx-auto font-semibold  bg-dank_yellow border-4 border-dank_yellow hover:bg-transparent  py-3 rounded-2xl">
                            I got it 
                        </button>
                        
                    </div>
                </>
            ) : (
                <>
                    <Image
                        src="/img/wrong.png"
                        placeholder="blur"
                        blurDataURL="/img/wrong.png"
                        width={200}
                        height={200}
                        alt={'wrong'}
                    />

                    <div className="flex text-lg items-center text-center flex-col w-full">
                        <p className="text-3xl my-2  font-semibold text-dank_yellow">
                            Wrong answer!
                        </p>
                        <p className="text-md font-medium text-custom_white">
                            Nice try, <span className="font-semibold">{username}</span>{" "}
                        </p>
                        <p className="my-4 font-medium">
                            The capital of <span className="font-semibold text-custom_white">{answer.question}</span> is{" "}
                            <span className="font-semibold text-custom_white">{answer.options[0].city}.</span>{" "}
                        </p>

                        <button onClick={()=>{
                            clickOnBackdrop();
                            nextQuestion();
                        }} className="transition-all  hover:text-custom_white w-5/6 text-center md:w-4/6 text-dank_brown  mx-auto font-semibold  bg-dank_yellow border-4 border-dank_yellow hover:bg-transparent  py-3 rounded-2xl">
                            I got it 
                        </button>

                    </div>
                </>
            )}
        </div>
    );
}
