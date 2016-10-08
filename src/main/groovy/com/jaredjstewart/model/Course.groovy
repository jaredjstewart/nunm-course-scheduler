package com.jaredjstewart.model

import groovy.transform.ToString

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

  public String toString() {
    return "$id-$section"
  }
}
