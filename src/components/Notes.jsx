import React, { useState } from 'react'
import NotesCreation from './NotesCreation';
import disabledBtn from '../assets/Vector (1).png';
import activeBtn from '../assets/Vector (2).png';
import TextComponent from './TextComponent';
import { useNavigate } from 'react-router-dom';

function Notes({ id }) {
    const storedNotesList = localStorage.getItem("NotesList");
    const updatedList = storedNotesList ? JSON.parse(storedNotesList) : [];


    const [text, setText] = useState('');

    const [notes, setNotes] = useState([]);


 
   

  

    const updatedListCopy = [...updatedList];

    const updateDateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const currentTime = `${hours}:${minutes}`


        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'short' }); // Get the short month name
        const year = now.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;

        updatedListCopy[id].notes.date = [...updatedListCopy[id].notes.date, formattedDate];

        updatedListCopy[id].notes.time = [...updatedListCopy[id].notes.time, currentTime]
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotes([...notes, text]);
        updatedListCopy[id].notes.text = [...updatedListCopy[id].notes.text, text];
        updateDateTime();
        localStorage.setItem("NotesList", JSON.stringify(updatedListCopy));
        setText('');
    };

    const navigate = useNavigate();

    return (
        <>
            {updatedList[id] ?
                (
                    <>
                    <div className='note-header'>
                        <div className="arrow" onClick={() => navigate('/')}>
                                <span>&#8592;</span>
                        </div>
                        <div style={{ marginLeft: '2rem' }}>
                            <NotesCreation bgColor={updatedList[id].color} notesName={updatedList[id].name} />
                        </div>

                    </div>
                    <div className='notes-storage'>

                        {updatedListCopy[id].notes.text.map((ele, ind) => (
                            <TextComponent key={ind} ele={ele} date={updatedListCopy[id].notes.date[ind]} time={updatedListCopy[id].notes.time[ind]} />
                        ))}

                    </div>

                    <div className='form-sec'>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                placeholder=' Enter your text here.............'
                                className='text-sec'
                                value={text}
                                onChange={
                                    (e) => {
                                        setText(e.target.value);
                                    }
                                }
                            />
                            {!text.length ? (<button className='send-btn' disabled>
                                <img src={disabledBtn} alt='' />
                            </button>) : (
                                <button type='submit' className='send-btn'>
                                    <img src={activeBtn} alt='' />
                                </button>
                            )}
                        </form>
                    </div>
                    </>
                ) : (
                   <>
                   </>
                    
                )
            }




        </>
    )
}

export default Notes