package com.jaredjstewart.model

import org.joda.time.Interval

import java.time.LocalDateTime

class CourseMeeting {
  Date start
  Date end
  Interval interval

  public boolean conflictsWith(CourseMeeting event) {
    return (interval.overlap(event.interval)) != null
  }
}
