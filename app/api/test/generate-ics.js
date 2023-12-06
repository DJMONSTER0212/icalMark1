// pages/api/generate-ics.js
import ical from 'ical.js';

export default async function handler(req, res) {
  // Generate your event data here
  const event = {
    summary: 'Sample Event',
    description: 'This is a sample event description.',
    start: new Date('2023-01-01T12:00:00Z'),
    end: new Date('2023-01-01T14:00:00Z'),
  };

  // Create the iCalendar component
  const jcalData = {
    'vevent': [
      { ...event },
    ],
  };

  const jcal = ical({ component: 'vcalendar', properties: [], components: [jcalData] });

  // Convert jCal to iCal
  const iCalData = jcal.toString();

  // Set response headers
  res.setHeader('Content-Type', 'text/calendar');
  res.setHeader('Content-Disposition', 'attachment;filename=calendar.ics');
  res.send(iCalData);
}