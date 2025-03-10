
const Curriculum = ({ name }) => <h1>{name}</h1>;

const CourseHeader = ({ header }) => {
  return (
    <h2>{header}</h2>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) =>
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises} />)}
    </>
  )
}

const Part = ({ name, exercises }) =>
  <p>{name} {exercises}</p>

const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <p><strong>total of {total} excercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (<>
    <CourseHeader header={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>)
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Curriculum name="Web development curriculum" />
      {courses.map((course) =>
        <Course
          key={course.id}
          course={course} />)}
    </div>
  )
}

export default App