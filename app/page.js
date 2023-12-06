import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>My Calendar</h1>
        <p>
          {/* Use the /api/calendar.ics route to fetch the iCal file */}
          <a href="/api/calendar.ics">Subscribe to Calendar</a>
        </p>
      </div>
    </main>
  )
}
