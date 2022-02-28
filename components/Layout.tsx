import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Geo-Guess</title>
      </Head>
      <main>
        <nav className="fixed bg-dank_yellow  w-full py-3">
          <div className="mx-auto w-5/6 md:container flex items-center justify-between  text-dark_color">
            <Link href="/"> 
              <a>
                <h1 className="text-xl font-semibold">GeoGuess</h1>
              </a>
            </Link>
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
};

export default Layout;
