import { useState } from 'react'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Header = ({ text }) => {
    return (
        <h1>{text}</h1>
    );
};
const StatisticLine = ({text, value}) => {
    return (
        <>
            <td>{text}</td>
            <td>{value}</td>
        </>);
}

const Statistics = ({good, neutral, bad}) =>{
    const all = good + neutral + bad
    const average = (good * 1 + bad * (-1) ) / (all)
    const positive = good * 100 / (all)

    if(all===0) {
        return (
            <h3 style = {{fontWeight: 'normal'}}>No feedback given</h3>)
    } else {
        return (
            <div>
            <table>
                    <tbody>
                    <tr><StatisticLine text="good: " value = {good} /></tr>
                    <tr><StatisticLine text="neutral: " value = {neutral} /></tr>
                    <tr><StatisticLine text="bad: " value = {bad} /></tr>
                    <tr><StatisticLine text="all: " value = {all} /></tr>
                    <tr><StatisticLine text="average: " value = {average} /></tr>
                    <tr><StatisticLine text="positive: " value = {positive + " %"} /></tr>
                    </tbody>
            </table>
            </div>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text = 'give feedback'/>
            <Button onClick = {() => setGood(good+1)} text ='good' />
            <Button onClick = {() => setNeutral(neutral+1)} text ='neutral' />
            <Button onClick = {() => setBad(bad+1)} text ='bad' />
            <Header text ='statistics' />
            <Statistics good = {good} neutral = {neutral} bad = {bad}/>
        </div>
    )
}

export default App