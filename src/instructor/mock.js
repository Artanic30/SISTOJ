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

const returnSubmissionHistory = function () {
  let submissionHistorys = []
  for (let i = 0; i <= 7; i++) {
    let submissionHistory = {
      'git_commit_id': Random.word(25, 40),
      'course_uid': Random.word(25, 40),
      'message': Random.sentence(30, 100),
      'score': Random.natural(10, 100),
      'overall_score': Random.natural(100, 120),
      'submission_time': Random.date(),
      'delta': Random.natural(0, 20)
    }
    submissionHistorys.push(submissionHistory)
  }
  return submissionHistorys
}

const returnAssignmentScoreboard = function () {
  let scoreBoard = []
  for (let i = 0; i <= 34; i++) {
    let scores = {
      'nickname': Random.name(),
      'score': Random.natural(10, 100),
      'overall_score': Random.natural(100, 120),
      'submission_time': Random.date(),
      'delta': Random.natural(0, 10)
    }
    scoreBoard.push(scores)
  }
  return scoreBoard
}

const returnStudentList = function () {
  let studentList = []
  for (let i = 0; i <= 12; i++) {
    let list = {
      'name': Random.name(),
      'uid': Random.guid(),
      'email': Random.email(),
      'student_id': Random.natural(10, 11)
    }
    studentList.push(list)
  }
  return studentList
}

// Mock.mock( url, post/get , 返回的数据);
Mock.mock(/instructor\/[0-9a-zA-Z]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/course\/[0-9]+\/students/, 'get', returnStudentList())
Mock.mock(/course\/[0-9]+\/assignment\/[0-9]+\/scores/, 'get', returnAssignmentScoreboard())
Mock.mock(/student\/[0-9]+\/course\/[0-9]+\/assignment\/[0-9]+\/history/, 'get', returnSubmissionHistory)
Mock.mock(/course\/[a-zA-Z0-9]+\/assignment/, 'get', returnCourseAssignment)
