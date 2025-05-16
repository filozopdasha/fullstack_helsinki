export const Header = (props) => {

    console.log(props)
    return <h2>{props.course}</h2>
}
const Part = ({part}) => {

    console.log(part)

    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
export const Content = ({ parts }) => (
    <div>
        {parts.map(part => (
            <Part key={part.id} part={part} />
        ))}
    </div>
)


export const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return <p><strong>total of {total} exercises</strong></p>
}

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course;