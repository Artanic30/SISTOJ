const Mock = require('mockjs')
const Random = Mock.Random
Random.extend({
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
      'course_uid': Random.guid(),
      'name': Random.name(),
      'deadline': Random.natural(1000000000, 9999999999),
      'release_date': Random.natural(1000000000, 9999999999),
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

const returnAddAssignment = function () {
  return {
    'uid': Random.guid()
  }
}

const returnJudges = function () {
  let judgeList = []
  for (let i = 0; i <= 12; i++) {
    let judge = {
      'uid': Random.guid(),
      'host': Random.ip(),
      'cert_ca': Random.name(),
      'client_cert': Random.name(),
      'client_key': Random.name(),
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
      'email': Random.email()
    }
    List.push(list)
  }
  return List
}

const returnCourseJudge = function () {
  let List = []
  for (let i = 0; i <= 6; i++) {
    let list = {
      'uid': Random.guid()
    }
    List.push(list)
  }
  return List
}

const returnRole = function () {
  return {
    'uid': Random.guid(),
    'is_student': Random.boolean(),
    'is_instructor': Random.boolean()
  }
}

const login = function () {
  return {
    'login_url': Random.url()
  }
}

// Mock.mock( url, post/get , 返回的数据);
Mock.mock(/instructor\/[-0-9a-zA-Z]+\/course/, 'post', 'success')
Mock.mock(/user\/login\/oauth\/param/, 'get', login)
Mock.mock(/user\/role/, 'get', returnRole)
Mock.mock(/course\/[-0-9a-zA-Z]+\/students/, 'post', 'success')
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'post', 'success')
Mock.mock(/course\/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'post', 'success')
Mock.mock(/course\/[-0-9a-zA-Z]+\/judge/, 'get', returnCourseJudge())
Mock.mock(/course\/[-0-9a-zA-Z]+\/assignment/, 'post', {url: Random.url(), uid: Random.guid()})
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructorList())
Mock.mock(/course\/[-0-9a-zA-Z]+\/students/, 'get', returnStudentList())
Mock.mock(/judge/, 'get', returnJudges)
Mock.mock(/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+/, 'post', returnAddAssignment)
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', returnInstructor)
Mock.mock(/instructor\/[-0-9a-zA-Z]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/course\/[-0-9a-zA-Z]+\/assignment/, 'get', returnAssignments())
Mock.mock(/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructors)
