package com.jaredjstewart

import com.jaredjstewart.model.Course
import com.jaredjstewart.parser.CourseRowParser
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.select.Elements

class Main {

  public static void main(String[] args) {
    Document doc = Jsoup.connect("https://www.nunmsonis.com/FCC_gensrsc.cfm").get();
    Elements tableRows = doc.select("#my-table tbody tr:gt(0)")

    List<String> desiredCourseIds=["BAS5110L", "BAS5111L"]
    List<Course> courses = tableRows.collect { Element row ->
      CourseRowParser.parse(row.select('td'));
    }.findAll ({it != null})

    courses = courses.findAll {desiredCourseIds.contains(it.id)}

    Map<String, List<Course>> possibleCourses = [:]
    for (String courseId :desiredCourseIds) {
      possibleCourses.put(courseId ,courses.findAll({course -> course.id == courseId}))
    }

    def List<List<Course>> combinations = possibleCourses.values().combinations()

    def workingCombos = combinations.findAll { !hasConflicts(it)}

   println workingCombos
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
