import { collection, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../database/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const userCollection = collection(db, "users");
    getDocs(userCollection).then(users => {
        
        let usersArray = <any>[];
        users.docs.forEach((doc)=>{
            usersArray.push({...doc.data(), id: doc.id});
        })
        //console.log(usersArray);
        res.send(usersArray);
    })
};
