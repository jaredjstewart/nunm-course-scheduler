package com.jaredjstewart.model

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
