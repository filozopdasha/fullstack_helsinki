import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const generateId = () => (100000 * Math.random()).toFixed(0)


const thisObject = (content) => ({
    content,
    id: generateId(),
    votes: 0,
})

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const userInput = useRef()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = userInput.current.value
        if (content.trim() === '') return

        dispatch(createAnecdote(thisObject(content)))

        dispatch(showNotification(`You created '${content}'`, 5))
        userInput.current.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input ref={userInput} /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm