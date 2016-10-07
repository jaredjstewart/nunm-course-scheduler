package com.jaredjstewart.parser

import com.jaredjstewart.model.Course
import com.jaredjstewart.model.CourseMeeting
import org.joda.time.DateTime
import org.joda.time.Interval
import org.jsoup.select.Elements

import java.text.SimpleDateFormat
import java.util.regex.Matcher

class CourseRowParser {
  private static final SimpleDateFormat sdf = new SimpleDateFormat("EEE h:mma");

  public static Course parse(Elements tds) {
    String times = tds.get(6).text().replaceAll("\n", "")
    if (times.contains("TBD")) {
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
    return Integer.valueOf(tokens.get(0)) > Integer.valueOf(tokens.get(1))
  }

  private static List<CourseMeeting> parseDatesFrom(String times) {
    String regex = /([A-Z]{3})\s*([\d:].*)-([\d:].*)/

    times.tokenize(',').collect {
      Matcher matcher = (it =~ regex)
      String day = matcher[0][1]
      String startTime = matcher[0][2]
      String endTime = matcher[0][3]

      Date startDate = sdf.parse("$day $startTime")
      Date endDate = sdf.parse("$day $endTime")
      new CourseMeeting(start: startDate, end: endDate, interval: new Interval(new DateTime(startDate), new DateTime(endDate)))
    }

  }

}

