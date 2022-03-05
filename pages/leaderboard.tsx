import { useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Leaderboards({data}:any) {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <div className="h-screen text-center flex items-center justify-center">
        <>
          {" "}
          {isLoading ? null : (
            <>
              <div>
                <Image
                  src="/img/thinkingeyes.png"
                  placeholder="blur"
                  blurDataURL="/img/thinkingeyes.png"
                  width={200}
                  height={200}
                  alt={"thinking_LEADERBOARD"}
                />

                <h2 className="text-3xl text-dark_color font-semibold underline underline-offset-4 decoration-4 my-12">
                  Best players in da world!
                </h2>

                {data.map((item: any, index: number) => {
                  return (
                    <div key={index} className="flex text-lg justify-between">
                      <div className="text-custom_white">
                        {index + 1}. { item.username}
                      </div>
                      <div className="text-custom_white">{item.score}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://guess-country-aa5b0b7to-markorodriguez.vercel.app/api/getScores");
  const data = await res.json()
  console.log(data)

  return{
    props: {
      data
    }
  }
}