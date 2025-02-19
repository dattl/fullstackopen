import { useState } from 'react'

const Statistics = (props) => {
  const { good, bad, neutral } = props;
  if (good || bad || neutral) {
    let all = good + neutral + bad;
    let average = (good - bad) / all;
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={(good * 100 / all) + " %"} />
          </tbody>
        </table>
      </div >
    )
  }
  else return <p>No feedback given</p>
};

const StatisticLine = ({ text, value }) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>Give feeback</h1>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App