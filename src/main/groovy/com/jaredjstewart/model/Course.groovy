package com.jaredjstewart.model

import groovy.transform.ToString

@ToString(includes = ["name", "id", "section"], includePackage = false)
class Course {
  String name
  String id
  String section
  boolean full

  List<CourseMeeting> meetings

  public boolean conflictsWith(Course thatClass) {
    meetings.any { thisClassMeeting ->
      thatClass.meetings.any { thatClassMeeting ->
        thisClassMeeting.conflictsWith(thatClassMeeting)
      }
    }
  }
}
