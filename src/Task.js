import { FaCheck } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const getComplete = (task, handleClose, handleComplete) => {
    return (
        <div className='works'>
          <div className='list-works' onClick={() => handleComplete(task.id)}>
            <div className='circle'>
              <FaCheck className='check' />
            </div>
            <span className='name-work'>{task.name}</span>
          </div>
          <AiOutlineClose className='close' onClick={() => handleClose(task.id)}/>
        </div>
    )
}

const noComplete = (task, handleClose, handleComplete) => {
    return (
        <div className='works'>
          <div className='list-works' onClick={() => handleComplete(task.id)}>
            <div className='circle'></div>
            <span className='name-works'>{task.name}</span>
          </div>
          <AiOutlineClose className='close' onClick={() => handleClose(task.id)}/>
        </div>
    )
}

function Task({task, handleClose, handleComplete}) {

  return (
    <>
      {task.complete ? getComplete(task, handleClose, handleComplete) : noComplete(task, handleClose, handleComplete)}
    </>
  )
}

export default Task