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
      'code': 'CS10' + i,
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
      'descr_link': 'http://www.baidu.com',
      'short_name': Random.name(),
      'score': Random.natural(0, 100),
      'overall_score': 100,
      'release_date': '2018-01-22T09:12:43.083Z',
      'deadline': '2019-08-07T15:59:59Z'
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
      'overall_score': Random.natural(10, 100),
      'submission_time': '2018-01-22T09:12:43.083Z',
      'delta': Random.natural(-20, 20)
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
      'submission_time': null,
      'delta': Random.natural(-10, 10)
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
      'submission_time': '2018-01-22T09:12:43.083Z'
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
      'enroll_email': Random.email()
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

const login = function () {
  return {
    'login_url': Random.url(),
    'logout_url': 'https://www.baidu.com'
  }
}

const returnAssignments = function () {
  let list = []
  for (let i = 0; i <= 6; i++) {
    let scores = {
      'uid': Random.guid(),
      'course_id': Random.guid(),
      'name': Random.name(),
      'deadline': '2018-01-22T09:12:43.083Z',
      'release_date': '2018-01-22T09:12:43.083Z',
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
      'enroll_email': Random.email(),
      'student_id': Random.natural(2018000000, 2018999999)
    }
    studentList.push(list)
  }
  return studentList
}

const returnAddAssignment = function () {
  return {
    'uid': Random.guid()
  }
}

const returnJudges = function () {
  let judgeList = []
  for (let i = 0; i <= 4; i++) {
    let judge = {
      'uid': `100 + ${i}`,
      'host': `1.1.1.${i}`,
      'max_job': Random.natural(1, 6)
    }
    judgeList.push(judge)
  }
  return judgeList
}

const returnJudges2 = function () {
  let judgeList = []
  for (let i = 0; i <= 4; i++) {
    let judge = {
      'uid': 99 + i,
      'host': `1.1.1.${i - 1}`,
      'max_job': Random.natural(1, 6)
    }
    judgeList.push(judge)
  }
  return judgeList
}

const returnInstructorList = function () {
  let List = []
  for (let i = 0; i <= 6; i++) {
    let list = {
      'name': Random.name(),
      'uid': Random.guid(),
      'enroll_email': Random.email()
    }
    List.push(list)
  }
  return List
}

const returnCourseJudge = function () {
  let List = [
    {
      'uid': 'test1'
    },
    {
      'uid': 'test1'
    },
    {
      'uid': 'test2'
    }
  ]
  return List
}

const returnJudgeInfo = function () {
  let count = Random.natural(7, 8)
  return {
    'uid': `test${count}`,
    'host': '1.1.2.' + count,
    'max_job': Random.natural(1, 6)
  }
}

const returnRole = function () {
  return {
    'uid': Random.guid(),
    'is_student': true,
    'is_instructor': true
  }
}
// Mock.mock( url, post/get , 返回的数据)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'delete', {})
Mock.mock(/[-0-9a-zA-Z]+\/student\/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/history/, 'get', returnSubmissionHistory)
Mock.mock(/[-0-9a-zA-Z]+\/student\/[-a-zA-Z0-9]+\/course\/[-a-zA-Z0-9]+\/assignment/, 'get', returnCourseAssignment)
Mock.mock(/[-0-9a-zA-Z]+\/student\/[-0-9a-zA-Z]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/[-0-9a-zA-Z]+\/student\/[-0-9a-zA-Z]+/, 'get', returnInstructor)
Mock.mock(/[-0-9a-zA-Z/:]+\/user\/login\/oauth\/param/, 'get', login)
Mock.mock(/[-0-9a-zA-Z/:]+\/user\/role/, 'get', returnRole)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/scores/, 'get', returnAssignmentScoreboard())
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', returnInstructor)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-a-zA-Z0-9]+\/queue/, 'get', returnPendingAssignment())
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructors)
Mock.mock(/[-0-9a-zA-Z]+\/student\/[-0-9a-zA-Z]+/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z/:]+\/user\/login\/oauth\/param/, 'get', login)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/judge/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'get', returnJudgeInfo)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/judge/, 'get', returnJudges2)
Mock.mock(/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'get', returnJudgeInfo)
Mock.mock(/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+\/course/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/students/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/judge/, 'get', returnCourseJudge)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment/, 'post', {ssh_url_to_repo: Random.url(), uid: Random.guid()})
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructorList())
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/students/, 'get', returnStudentList())
Mock.mock(/[-0-9a-zA-Z]+\/judge/, 'get', returnJudges)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+/, 'post', returnAddAssignment)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', returnInstructor)
Mock.mock(/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment/, 'get', returnAssignments())
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructors)
Mock.mock(/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', {'uid': Random.guid(), 'name': Random.name(), 'email': Random.email()})
