package com.jaredjstewart.model

import org.joda.time.Interval

class CourseMeeting {
  Date start
  Date end
  Interval interval

  public boolean conflictsWith(CourseMeeting event) {
    return (interval.overlap(event.interval)) != null
  }
}
