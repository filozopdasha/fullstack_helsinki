import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from "./components/Notification.jsx"
import { initializingAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializingAnecdotes())
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App