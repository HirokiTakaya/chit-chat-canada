import { NextResponse } from "next/server";

interface ParsedEvent {
  title: string;
  start: string;
  end: string;
  location: string;
  url: string;
  description: string;
}

function parseICalDate(dateStr: string): string {
  // Handle TZID format: DTSTART;TZID=America/Vancouver:20260315T140000
  const tzMatch = dateStr.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
  if (tzMatch) {
    const [, y, m, d, h, min, s] = tzMatch;
    return `${y}-${m}-${d}T${h}:${min}:${s}`;
  }
  return dateStr;
}

function parseICal(icalText: string): ParsedEvent[] {
  const events: ParsedEvent[] = [];
  const eventBlocks = icalText.split("BEGIN:VEVENT");

  for (let i = 1; i < eventBlocks.length; i++) {
    const block = eventBlocks[i].split("END:VEVENT")[0];

    const getField = (name: string): string => {
      // Handle multiline values (lines starting with space are continuations)
      const regex = new RegExp(`^${name}[;:](.*)`, "m");
      const match = block.match(regex);
      if (!match) return "";

      let value = match[1];
      // Check for continuation lines
      const lines = block.split("\n");
      let foundField = false;
      for (const line of lines) {
        if (foundField && line.startsWith(" ")) {
          value += line.substring(1).trim();
        } else if (line.startsWith(`${name};`) || line.startsWith(`${name}:`)) {
          foundField = true;
        } else if (foundField) {
          break;
        }
      }

      // Clean up value - remove TZID prefix if present
      value = value.replace(/^.*?:/, "").trim();
      // Unescape iCal values
      value = value
        .replace(/\\n/g, "\n")
        .replace(/\\,/g, ",")
        .replace(/\\\\/g, "\\")
        .replace(/\r/g, "");

      return value;
    };

    const title = getField("SUMMARY");
    const startRaw = block.match(/DTSTART[;:]([^\r\n]+)/)?.[1] || "";
    const endRaw = block.match(/DTEND[;:]([^\r\n]+)/)?.[1] || "";
    const location = getField("LOCATION");
    const url = getField("URL");
    const description = getField("DESCRIPTION");

    if (title) {
      events.push({
        title,
        start: parseICalDate(startRaw),
        end: parseICalDate(endRaw),
        location,
        url,
        description: description.substring(0, 200),
      });
    }
  }

  // Sort by start date, upcoming first
  const now = new Date().toISOString();
  events.sort((a, b) => a.start.localeCompare(b.start));

  // Filter to only upcoming events
  const upcoming = events.filter((e) => e.start >= now.substring(0, 19));

  return upcoming.slice(0, 8);
}

export async function GET() {
  try {
    const ICAL_URL =
      "https://www.meetup.com/an-effective-language-practice-english-japanese/events/ical/";

    const res = await fetch(ICAL_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "User-Agent": "ChitChatCanada/1.0",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { events: [], error: `Meetup returned ${res.status}` },
        { status: 200 }
      );
    }

    const icalText = await res.text();
    const events = parseICal(icalText);

    return NextResponse.json({ events }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Failed to fetch Meetup iCal:", error);
    return NextResponse.json({ events: [], error: "Failed to fetch events" }, { status: 200 });
  }
}