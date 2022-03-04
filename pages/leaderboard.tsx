import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import axios from "axios";

export default function Leaderboards() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getScores")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                    <div key={index} className="flex text-lg justify-around">
                      <div className="text-custom_white">
                        {index + 1}. {item.username}
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
