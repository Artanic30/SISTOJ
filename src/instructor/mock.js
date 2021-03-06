const Mock = require('mockjs')
const Random = Mock.Random
Random.extend({
  season: function () {
    const seasons = ['Fall', 'Summer', 'Spring', 'Winter']
    return this.pick(seasons)
  },
  judges: function () {
    let judgeList = []
    for (let i = 0; i <= 4; i++) {
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
      'enroll_email': Random.email(),
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
    'enroll_email': Random.email()
  }
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
      'uid': 100 + i,
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
  return ['11111', '22222', '33333', '444444', '555555', '666666', '777777']
}

const returnRole = function () {
  return {
    'uid': Random.guid(),
    'is_student': true,
    'is_instructor': false
  }
}

const returnJudgeInfo = function () {
  return {
    'uid': Random.guid(),
    'host': Random.ip(),
    'max_job': Random.natural(1, 6)
  }
}

const login = function () {
  return {
    'login_url': Random.url()
  }
}

// Mock.mock( url, post/get , 返回的数据);    wasted mock.js!!!!!!
Mock.mock(/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', {'uid': Random.guid(), 'name': Random.name(), 'email': Random.email()})
Mock.mock(/[-0-9a-zA-Z/:]+\/user\/login\/oauth\/param/, 'get', login)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/judge/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'get', returnJudgeInfo)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+\/judge/, 'get', returnJudges2)
Mock.mock(/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'get', returnJudgeInfo)
Mock.mock(/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+\/course/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z/:]+\/api\/user\/role/, 'get', returnRole)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/students/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/judge\/[-0-9a-zA-Z]+/, 'post', 'success')
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/judge/, 'get', returnCourseJudge())
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment/, 'post', {ssh_url_to_repo: Random.url(), uid: Random.guid()})
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructorList())
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/students/, 'get', returnStudentList())
Mock.mock(/[-0-9a-zA-Z]+\/judge/, 'get', returnJudges)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment\/[-0-9a-zA-Z]+/, 'post', returnAddAssignment)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+/, 'get', returnInstructor)
Mock.mock(/[-0-9a-zA-Z]+\/instructor\/[-0-9a-zA-Z]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/assignment/, 'get', returnAssignments())
Mock.mock(/[-0-9a-zA-Z]+\/course\/[-0-9a-zA-Z]+\/instructor/, 'get', returnInstructors)
