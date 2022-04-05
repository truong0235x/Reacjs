import './App.scss'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { tasks } from './tasks'
import Task from './Task'


function App() {
  const [tag, setTag] = useState('all')
  const [work, setWork] = useState([...tasks])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('all')
  const [statusWork, setStatusWork] = useState([...tasks])

  const tagInput = useRef()
  const clear = useRef()

  useEffect(()=> {
    const listTasks = [...tasks]
    if (tag === 'all') {
      clear.current.style = "display: none;"
      setWork([
        ...listTasks
      ])
      setStatusWork([
        ...listTasks
      ])
    } else {
      const newWorks = listTasks.filter(item => item.tag === tag)
      clear.current.style = "display: block;"

      setWork([
        ...newWorks
      ])
      setStatusWork([
        ...newWorks
      ])
    }
  },[tag])

  useLayoutEffect(() =>{
    const allWorks = [...statusWork]
    if (status === 'all') {
      setWork([
        ...allWorks
      ])
    }
    if (status === 'active') {
      const newWork = allWorks.filter(item => item.complete === false)

      setWork([
        ...newWork
      ])
    }
    if (status === 'completed') {
      const newWork = allWorks.filter(item => item.complete === true)

      setWork([
        ...newWork
      ])
    }
  },[status, statusWork])

  const handleTag = (e, nameTag) => {
    const tagSelected = document.querySelectorAll("div[class^='tag__']")

    for (let i = 0; i < tagSelected.length; i++) {
      tagSelected[i].id = ""
    }
    setTag(nameTag)
    e.id = nameTag
  }

  const handleTask = (e, text) => {
    const statusChecked = document.querySelectorAll("div[class^='status__tasks-']")

    for (let i = 0; i < statusChecked.length - 1; i++) {
      statusChecked[i].style = "background-color: #ffffff;"
    }
    e.style = "background-color: #eeeef6"

    setStatus(text)
  }

  const handleClose = id => {
    const newWorks = statusWork.filter(item => item.id !== id)

    setWork([
      ...newWorks
    ])
    setStatusWork([
      ...newWorks
    ])
    tasks.forEach((item, index) => {
      if (item.id === id) {
        tasks.splice(index, 1)
      }
    })

  }

  const handleInput = value => {
    setInput(value)
  }

  const addWorks = () => {
    if (input === '') {
      alert('bạn phải nhập tên công việc trước khi thêm')
      return
    }
    if (tag === 'all') {
      alert('chỉ có thể add tag: home, work, school')
    } else {
      const id = tasks[tasks.length - 1].id + 1
      
      const addworks = {
        id: id,
        tag: tag,
        name: input,
        complete: false,
      }

      setWork([
        ...work,
        addworks
      ])
      tagInput.current.focus()
      setInput('')

      tasks.push(addworks)
    }
  }

  const handleComplete = id => {
    work.forEach(item => {
      if (item.id === id) {
        item.complete = !item.complete
      }
    })

    setWork([
      ...work
    ])
    setStatus('all')
    const statusChecked = document.querySelectorAll("div[class^='status__tasks-']")

    for (let i = 0; i < statusChecked.length - 1; i++) {
      statusChecked[i].style = "background-color: #ffffff;"
    }
    statusChecked[0].style = "background-color: #eeeef6"
  }

  const handleClear = () => {
    work.forEach(item =>{
      if(item.complete === true) {
        item.complete = false
      }
    })
    setWork([
      ...work
    ])
    setStatus('all')
    const statusChecked = document.querySelectorAll("div[class^='status__tasks-']")

    for (let i = 0; i < statusChecked.length - 1; i++) {
      statusChecked[i].style = "background-color: #ffffff;"
    }
    statusChecked[0].style = "background-color: #eeeef6"
  }

  let a = 0
  work.forEach(item => {
    if (item.complete) {
      a = a + 1
    }
  })

  return (
    <div className="container">
      <h1 className='title'>REACT TO DO APP</h1>
      <div className="wrapper">
        <div className='add-word'>
          <input className='input'
            placeholder='What do you need to do?'
            value={input}
            onChange={e => handleInput(e.target.value)}
            ref={tagInput}
          />
          <div className='plus'><FaPlus className='fa-plus' onClick={addWorks}/></div>
        </div>

        <div className='tag'>Tags
          <div className='tag__all' id="all" onClick={e => handleTag(e.target, 'all')}>all</div>
          <div className='tag__home' onClick={e => handleTag(e.target, 'home')}>home</div>
          <div className='tag__work' onClick={e => handleTag(e.target, 'work')}>word</div>
          <div className='tag__school' onClick={e => handleTag(e.target, 'school')}>school</div>
        </div>
  
        <div className='list-work'>
          {work.map(item => (
            <Task key={item.id} task={item} handleClose={handleClose} handleComplete={handleComplete} />
          ))}
        </div>
        <div className='status'>
          <div className='status__tasks'>
            <div className='status__tasks-all' onClick={e => handleTask(e.target, 'all')}>All Tasks</div>
            <div className='status__tasks-active' onClick={e => handleTask(e.target, 'active')}>Active</div>
            <div className='status__tasks-completed' onClick={e => handleTask(e.target, 'completed')}>Completed</div>
            <div className='status__tasks-clear' ref={clear} onClick={handleClear}>Clear Completed</div>
          </div>
          <div className='number-completed'>
            {a}/{work.length} Completed
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
