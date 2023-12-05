import { NextResponse } from "next/server";
import ical from 'ical-generator';
// import http from 'node:http';
import fs from 'fs';
import path from 'path';
import http from 'http';


export async function GET(
    req
) {
    try {
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

        const publicFolderPath = path.join("C:/Study/Testing/icalGen/my-app/", 'public');
        const icalFilePath = path.join(publicFolderPath, 'calendar.ics');
        fs.writeFileSync(icalFilePath, calendar.toString());



        http.createServer(async (req, res) => {

            res.writeHead(200, {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="calendar.ics"'
            });
            const fileContent = fs.readFileSync(icalFilePath, 'utf-8');
            res.end(fileContent);


        }).listen(3000, '127.0.0.1', () => {
            console.log('Server running at http://127.0.0.1:3000/');
        });


        return NextResponse.json({ "hello": "world" });

    } catch (error) {
        console.log('error', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}