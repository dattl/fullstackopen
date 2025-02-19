const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({parts}) => {
  console.log(`${JSON.stringify(parts)}`);
  return (
    <>
      <Part content={parts[0]} />
      <Part content={parts[1]} />
      <Part content={parts[2]} />
    </>
  )
}

const Part = ({content}) => {
  const {name, exercises} = content;
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({parts}) => {
  let total = 0;
  parts.forEach((value) => total += value.exercises);

  return (
    <p>Number of excercises {total}</p>
  )
}

const App = () => {

  const course = {

    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App