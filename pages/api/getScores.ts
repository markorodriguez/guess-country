import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../database/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const userCollection = collection(db, "users");

    const q = query(userCollection, orderBy("score", "desc"), limit(10));

    getDocs(q).then((user) => {
        let usersArray = <any>[];
        user.docs.forEach((doc) => {
            usersArray.push({ ...doc.data(), id: doc.id });
        });
        res.send(usersArray);
    });
};
