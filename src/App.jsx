import { useState, useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
// import style from './index.css?inline'

function App(){
  const [notes, setNote] = useState([])
  const[showAll, setShowAll] = useState(true)
  const[text, setText] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  //getting data from server (http get USING AXIOUS)
      useEffect(()=>{
        console.log("use effect"),
        // axios.get('http://localhost:3000/notes')
        noteService.getAll()
        .then((initialNotes)=>{
          setNote(initialNotes)
        })}, []);
     // console.log('rendered', notes.length, 'notes')

  //if statement
    const showNotes = showAll
    ? notes
    : notes.filter(note => note.important === true)


function AddNote(){
    console.log('Adding Note')
    const noteObj = {
        // id: notes.length + 1, let the server generate id itself
        content: text,
        important: Math.random() > 0.5
    }
    //altering the data(notes) on server (HTTP POST)
    // axios.post('http://localhost:3000/notes/', noteObj)
    noteService.create(noteObj)
    .then((returnedNote)=>{
    console.log("promise successfull")
    // const newNote = responce.data;
    setNote(notes.concat(returnedNote))
    setText('')

  //earlier was alert('the note...')
  setErrorMessage(`New Note added successfully!`)
  //remove message after 3 sec
  setTimeout(()=>{
   setErrorMessage(null)
  }, 3000)

    })
}

function toggleImportanceOf(id){
    const note = notes.find(n => n.id === id)
    console.log('Change note of this id: ', note.id);
      //creating new object of the note bec can not change directly in the state
    const changedNote = {...note, important: !note.important}
    //replace the note in the notes in server //axios.put(url, changedNote)
    noteService
    .update(id, changedNote)
    .then(returnedNote=>{
      //now update the note in state also from server data
      console.log("changing note importance in state")
        setNote(notes.map(note => note.id !== id ? note : returnedNote))
      })
    .catch(error =>{
      console.error(error);
     setErrorMessage(`Note '${note.content}' was already removed from server`)
     //remove message after 5 sec
     setTimeout(()=>{
      setErrorMessage(null)
     }, 5000)
      //Set the state again(delete handcoded note) filter method.it give new array with all ids execept this id
       setNote(notes.filter(n =>n.id !== id))
    })
 }

// const toggleImportanceOf = id => {
//   const note = notes.find(n => n.id === id)
//   const changedNote = { ...note, important: !note.important }

//   noteService
//     .update(id, changedNote).then(returnedNote => {
//       setNote(notes.map(note => note.id !== id ? note : returnedNote))
//     })
//     .catch(error => {
//       setErrorMessage(
//         `Note '${note.content}' was already removed from server`
//       )
//       setTimeout(() => {
//         setErrorMessage(null)
//       }, 5000)
//       setNote(notes.filter(n => n.id !== id))
//     })
// }

function ChangeInput(event){
  setText(event.target.value)
}

  return(
    <div>
      <h1>Notes</h1>
       <Notification message={errorMessage}/> 
      <button className='button' onClick={()=>setShowAll(!showAll)}> 
        Show {showAll ? ' important' : ' All'}
      </button>
      <ul>
        {showNotes.map(note => 
        <Note 
        key={note.id}
        note= {note}
        toggleImportance={() => toggleImportanceOf(note.id)}
        />)}
      </ul>
      <form onSubmit={(event)=> event.preventDefault()}>
        <input className='input' value={text} onChange={ChangeInput} />
        <button className='button' onClick={AddNote}>Save</button>
      </form>
      <Footer/>
    </div>
  )

}
export default App