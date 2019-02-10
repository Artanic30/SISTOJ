const Mock = require('mockjs')
const Random = Mock.Random
Random.extend({
  status: function () {
    const status = ['Failed', 'Ongoing', '59/100']
    return this.pick(status)
  },
  season: function () {
    const seasons = ['Fall', 'Summer', 'Spring', 'Winter']
    return this.pick(seasons)
  }
})

const returnStudentCourseList = function () {
  let courses = []
  for (let i = 0; i <= 3; i++) {
    let course = {
      'uid': Random.guid(),
      'name': Random.name(),
      'code': Random.guid(),
      'semester': Random.season(),
      'year': 2019,
      'homepage': Random.domain(),
      'instructor': [Random.name(), Random.name(), Random.name(), Random.name(), Random.name()]
    }
    courses.push(course)
  }
  return courses
}

const returnCourseAssignment = function () {
  let assignments = []
  let courseId = Random.guid()
  for (let i = 0; i <= 3; i++) {
    let assignment = {
      'uid': Random.guid(),
      'course_uid': courseId,
      'name': Random.name(),
      'descr_link': Random.url(),
      'state': Random.status(),
      'release': Random.date(),
      'due': Random.date()
    }
    assignments.push(assignment)
  }
  return assignments
}

const returnInstructors = function () {
  let instructors = []
  for (let i = 0; i <= 4; i++) {
    let instructor = {
      'uid': Random.guid(),
      'name': Random.name(),
      'email': Random.email()
    }
    instructors.push(instructor)
  }
  return instructors
}

const returnAssignments = function () {
  let list = []
  for (let i = 0; i <= 6; i++) {
    let scores = {
      'uid': Random.guid(),
      'course_id': Random.guid(),
      'name': Random.name(),
      'deadline': Random.date(),
      'release_date': Random.date(),
      'descr_link': Random.url()
    }
    list.push(scores)
  }
  return list
}

const returnStudentList = function () {
  let studentList = []
  for (let i = 0; i <= 12; i++) {
    let list = {
      'name': Random.name(),
      'uid': Random.guid(),
      'email': Random.email(),
      'student_id': Random.natural(2018000000, 2018999999)
    }
    studentList.push(list)
  }
  return studentList
}

const returnInstructor = function () {
  return {
    'uid': Random.guid(),
    'name': Random.name(),
    'email': Random.email()
  }
}

// Mock.mock( url, post/get , 返回的数据);
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', returnInstructor)
Mock.mock(/instructor\/[0-9a-zA-Z]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/course\/[0-9]+\/students/, 'get', returnStudentList())
Mock.mock(/course\/[-0-9a-zA-Z]+\/assignment/, 'get', returnAssignments())
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructors)
Mock.mock(/course\/[a-zA-Z0-9]+\/assignment/, 'get', returnCourseAssignment)
