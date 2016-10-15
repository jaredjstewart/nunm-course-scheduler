package com.jaredjstewart.parser

import com.jaredjstewart.model.Course
import com.jaredjstewart.model.CourseMeeting
import org.joda.time.Interval
import org.jsoup.select.Elements

import java.text.SimpleDateFormat
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.time.temporal.TemporalAdjusters
import java.util.regex.Matcher

class CourseRowParser {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("EEE h:mma");
    private static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("h:mma")
    private static LocalDate previousMonday = LocalDate.now(ZoneId.of("America/Montreal")).with(TemporalAdjusters
            .next(
            DayOfWeek.MONDAY));

    public static Course parse(Elements tds) {
        String times = tds.get(6).text().replaceAll("\n", "")
        if (times.contains("TBD") || times.contains("Unassigned")) {
            return null
        }
        List<CourseMeeting> meetingTimes = parseDatesFrom(times)

        String section = tds.get(1).text().replaceAll("\n", "");
        String seats = tds.get(7).text();
        boolean isFull = isFull(seats)

        String nameAndIdRegex = /(.*)\((.*)\)/
        Matcher matcher = (tds.get(0).text() =~ nameAndIdRegex)
        String name = matcher[0][1]
        String id = matcher[0][2]


        return new Course(name: name,
                id: id,
                meetings: meetingTimes,
                full: isFull,
                section: section
        )
    }

    private static isFull(String seats) {
        List<String> tokens = seats.tokenize("/")
        return Integer.valueOf(tokens.get(0)) >= Integer.valueOf(tokens.get(1))
    }

    private static List<CourseMeeting> parseDatesFrom(String times) {
        String regex = /([A-Z]{3})\s*([\d:].*)-([\d:].*)/

        times.tokenize(',').collect {
            try {
                Matcher matcher = (it =~ regex)
                String dayString = matcher[0][1]
                String startTimeString = matcher[0][2]
                String endTimeString = matcher[0][3]

                LocalTime startTime = localTimeFromStrings(dayString, startTimeString)
                LocalTime endTime = localTimeFromStrings(dayString, endTimeString)

                LocalDate startDay = previousMonday.plusDays(dayToInt(dayString))

                LocalDateTime start = startDay.atTime(startTime)
                LocalDateTime end = startDay.atTime(endTime)

                new CourseMeeting(start: dateOf(start), end: dateOf(end),
                        interval: new
                                Interval(longOf(start), longOf(end)))
            } catch (e) {
                e.printStackTrace()
            }
        }

    }

    private static LocalTime localTimeFromStrings(String dayString, String timeString) {
        localTimeFromDate (sdf.parse("$dayString $timeString"))
    }

    private static LocalTime localTimeFromDate(Date startDate) {
        LocalDateTime.ofInstant(startDate.toInstant(), ZoneId.systemDefault()).toLocalTime()
    }

    private static Date dateOf(LocalDateTime date) {
        Date.from(date.atZone(ZoneId.systemDefault()).toInstant());
    }

    private static long longOf(LocalDateTime date) {
        ZonedDateTime zdt = date.atZone(ZoneId.of("America/Los_Angeles"))
        long millis = zdt.toInstant().toEpochMilli();
        return millis
    }

    private static int dayToInt(String day) {
        return ["MON", "TUE", "WED", "THU", "FRI"].indexOf(day);
    }

}

