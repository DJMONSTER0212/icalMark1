import {NextResponse} from "next/server"
import ical from "node-ical"
import icsModel from "@/models/ics.model"
import connectDB from "@/conf/database/dbConfig"
import mongoose from 'mongoose'
import icalParser from "@/conf/actions/icalParser"
// import ical as ical1 from "ical"
connectDB()

export async function GET(
    req, {params}
){
    const {villaId} = params;
    try {
        const data = await icsModel.find({
            villaId: villaId
        })
        const {icsContent} = data[0];
        const temp = await icalParser(icsContent);
        console.log(temp);
        // temp.then((value)=>{
            // console.log(value)
            return NextResponse.json(temp);
        // })

        // console.log(icsContent)

    } catch (error) {
        console.log(error)
    }
}