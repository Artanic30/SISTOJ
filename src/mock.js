const Mock = require('mockjs')
const Random = Mock.Random
Random.extend({
  status: function () {
    const status = ['Failed', 'Ongoing', '59/100']
    return this.pick(status)
  }
})

const returnStudentCourseList = function () {
  let courses = []
  for (let i = 0; i <= 3; i++) {
    let course = {
      'uid': Random.guid(),
      'name': Random.name(),
      'code': Random.guid(),
      'semester': 'Fall',
      'year': 2019,
      'homepage': Random.domain(),
      'instructor': [Random.guid(), Random.guid()]
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

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(/student\/[0-9]+\/course/, 'get', returnStudentCourseList)
Mock.mock(/course\/[0-9]+\/assignment/, 'get', returnCourseAssignment)
