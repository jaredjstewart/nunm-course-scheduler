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

    List<Course> courses = tableRows.collect { Element row ->
      CourseRowParser.parse(row.select('td'));
    }.findAll ({it != null})


    println "yo"
  }
}
