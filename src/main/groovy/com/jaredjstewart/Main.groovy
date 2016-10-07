package com.jaredjstewart

import com.jaredjstewart.parser.CourseRowParser
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.select.Elements

class Main {

  public static void main(String[] args) {
    Document doc = Jsoup.connect("https://www.nunmsonis.com/FCC_gensrsc.cfm").get();
    Elements tableRows = doc.select("#my-table tbody tr:gt(0)")

    tableRows.collect { Element row ->
      CourseRowParser.parse(row.select('td'));
    }
//    title: tds.get(2).select('a').text(),
//        uri: new URI(tds.get(2).select('a').attr('href')),
//        name: formatName(tds.get(3).text()),
//        phone: tds.get(4).text(),
//        email: tds.get(5).text()
  }
}
