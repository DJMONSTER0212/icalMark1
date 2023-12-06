import { NextResponse } from "next/server";
import ical from 'ical-generator';
// import http from 'node:http';
import fs from 'fs';
// import ical from "node-ical"
import path from 'path';
import http from 'http';
import connectDB from "@/conf/database/dbConfig";
import mongoose from "mongoose"
import icsModel from "@/models/ics.model"

connectDB()
//  Create ICS content for a villa

export async function POST(
    req
) {
    try {
        const body = await req.json()
        const {villaId} = body;


        // const url= "https://drive.google.com/file/d/1kGt7mULgUk1hXqPVQ2gYpjC3khImXWTh/view?usp=sharing"
        // ical.fromURL("https://www.airbnb.co.in/calendar/ical/39378614.ics?s=e900be549a200d82352ed858a3d8bc88", {}, function(err, data) {
        //     if (err) console.log(err);
        //     console.log(data);
        // });
        const calendar = ical({ name: 'my first iCal' });
        const startTime = new Date();
        const endTime = new Date();
        endTime.setHours(startTime.getHours() + 1);
        const temp = calendar.createEvent({
            start: startTime,
            end: endTime,
            summary: 'Example Event',
            description: 'It works ;)',
            location: 'my room',
            url: 'http://sebbo.net/'
        });
        // https://drive.google.com/file/d/1kGt7mULgUk1hXqPVQ2gYpjC3khImXWTh/view?usp=sharing
        // console.log(__dirname)
        const publicFolderPath = path.join("C:/Study/Testing/icalGen/my-app/", 'public');
        const icalFilePath = path.join(publicFolderPath, 'calendar.ics');
        // console.log(calendar.toString())
        const icsContent = calendar.toString();
        // console.log(icsContent)
        // fs.writeFileSync(icalFilePath, calendar.toString());
        const newICS = await icsModel.create({
            villaId,
            icsContent
        })




        // http.createServer(async (req, res) => {

        //     res.writeHead(200, {
        //         'Content-Type': 'text/calendar; charset=utf-8',
        //         'Content-Disposition': 'attachment; filename="calendar.ics"'
        //     });
        //     const fileContent = fs.readFileSync(icalFilePath, 'utf-8');
        //     res.end(fileContent);


        // }).listen(3000, '127.0.0.1', () => {
        //     console.log('Server running at http://127.0.0.1:3000/');
        // });


        return NextResponse.json(newICS);

    } catch (error) {
        console.log('error', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}