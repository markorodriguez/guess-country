import { collection, addDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../database/firebase";

export default async(req: NextApiRequest, res: NextApiResponse)=>{
    console.log(req.body);
    const userCollection = collection(db, "users");
    addDoc(userCollection, {
        score: req.body.score,
        username: req.body.username
    }).then(()=>{
        console.log('added');
        res.send('added');
    })
}