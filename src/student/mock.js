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
      'score': Random.natural(0, 5),
      'overall_score': Random.natural(10, 15),
      'release_date': Random.date(),
      'deadline': Random.date()
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
  for (let i = 0; i <= 200; i++) {
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

const returnPendingAssignment = function () {
  let pendingList = []
  for (let i = 0; i <= 12; i++) {
    let list = {
      'submitter': Random.name(),
      'git_commit_id': Random.word(25, 40),
      'course_id': Random.word(25, 40),
      'submission_time': Random.date()
    }
    pendingList.push(list)
  }
  return pendingList
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

const returnInstructor = function () {
  return {
    'uid': Random.guid(),
    'name': Random.name(),
    'email': Random.email()
  }
}
const returnRole = function () {
  return {
    'uid': Random.guid(),
    'is_student': Random.boolean(),
    'is_instructor': !Random.boolean()
  }
}

// Mock.mock( url, post/get , 返回的数据)
Mock.mock(/user\/role/, 'get', returnRole)
Mock.mock(/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/scores/, 'get', returnAssignmentScoreboard())
Mock.mock(/student\/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/history/, 'get', returnSubmissionHistory)
Mock.mock(/student\/[-a-zA-Z0-9]+\/course\/[-a-zA-Z0-9]+\/assignment/, 'get', returnCourseAssignment)
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', returnInstructor)
Mock.mock(/student\/[0-9]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/course\/[-a-zA-Z0-9]+\/queue/, 'get', returnPendingAssignment())
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructors)
