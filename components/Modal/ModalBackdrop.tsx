import React from "react";

export default function Modal({ isOpen, clickOnBackdrop, children }: any) {
    return (
        <React.Fragment>
            {isOpen ? (
                <>
                    <div
                        onClick={() => {
                            clickOnBackdrop();
                        }}
                        className="backdrop h-screen w-screen absolute"
                    ></div>

                    <div className="absolute modal items-center shadow-2xl border-4 border-red-500 rounded-2xl justify-center bg-red-500 w-5/6 flex md:w-2/6 py-8">
                        <div className="w-full h-full">{children}</div>
                    </div>
                </>
            ) : null}
        </React.Fragment>
    );
}
