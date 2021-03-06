package com.jaredjstewart

import com.jaredjstewart.model.Course
import com.jaredjstewart.parser.CourseRowParser
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.select.Elements

import java.nio.charset.Charset

class Main {

  public static void main(String[] args) {

//    Document doc = Jsoup.connect("https://www.nunmsonis.com/FCC_gensrsc.cfm").get();
    println ("Parsing courses...")
    Document doc = Jsoup.parse(new File(System.getResource("/nunmWinter2017.html").toURI()), 'UTF-8')
    Elements tableRows = doc.select("#my-table tbody tr:gt(0)")

    List<String> desiredCourseIds=['BAS5121','BAS5121L', 'BAS5121T', 'CLE5120', 'PHL5120', 'THR5120', 'THR5120L', 'THR5120T', 'BAS5120', 'BAS5120L','BAS5120T', 'CLE5120']


    List<Course> courses = tableRows.collect { Element row ->
      CourseRowParser.parse(row.select('td'));
    }.findAll ({it != null})

    for (String str : desiredCourseIds) {
      if (!(courses*.id.contains(str))) {
        throw new RuntimeException("$str  NOT FOUND")
      }
    }

    courses = courses.findAll {desiredCourseIds.contains(it.id) }//&& !it.full}

    Map<String, List<Course>> possibleCourses = [:]
    for (String courseId :desiredCourseIds) {
      possibleCourses.put(courseId ,courses.findAll({course -> course.id == courseId}))
    }

    println "Generating combinations..."
    def List<List<Course>> combinations = possibleCourses.values().combinations()

    println "Finding valid combinations... (brute force combinatorial search - this step might be a bit slow)"
    def workingCombos = combinations.findAll { !hasConflicts(it)}

    System.out.println("All working combinations found.")

    println ("Connecting to Google...")
    CalendarQuickStart calendarQuickStart = new CalendarQuickStart();

    println ("Creating calendar of courses...")


    workingCombos.take(1).first().each{ Course course ->
      com.google.api.services.calendar.model.Calendar createdCalendar = calendarQuickStart.createCalendar("Nunm " +
              "Schedule");

      calendarQuickStart.createEventsForCourse(course, createdCalendar.getId());
    }

    println ("Complete.")
  }

  private static boolean hasConflicts(List<Course> combination) {
    pairs(combination).any { List<Course> it->
      it[0].conflictsWith(it[1])
    }
  }

  static List<List<Course>> pairs(List<Course> elements) {
    return elements.tail().collect { [elements.head(), it] } + (elements.size() > 1 ? pairs(elements.tail()) : [])
  }
}
