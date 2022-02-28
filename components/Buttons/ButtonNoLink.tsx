import React from "react";


export default function Button(props: any) {
  return (
    <button onClick={()=>{props.getValue(props.value)}} className="my-2 transition-all hover:text-custom_white w-5/6 text-center md:w-4/6  mx-auto font-semibold  bg-dank_yellow border-4 border-dank_yellow hover:bg-transparent  py-3 rounded-2xl">
          {props.text}
    </button>
  );
}
