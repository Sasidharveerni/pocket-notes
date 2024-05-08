/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import '../App.css';
import logo from '../assets/image-removebg-preview 1.png'
import vector from '../assets/Vector.png'
import Modal from '../components/Modal';
import NotesCreation from '../components/NotesCreation';
import Notes from '../components/Notes';
import { useNavigate } from 'react-router-dom';

function HomeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    name: "",
    color: "",
    notes: {
      text: [],
      date: [],
      time: []
    },

  });
  const [notesList, setNotesList] = useState([]);
  const [error, setError] = useState(true);


  const [click, setClick] = useState(0);

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  useEffect(() => {
    try {
      const storedNotesList = localStorage.getItem("NotesList");
      const parsedNotesList = storedNotesList ? JSON.parse(storedNotesList) : [];
      const clickedInd = localStorage.getItem("Index") || null;
      setClick(clickedInd)
      setNotesList(parsedNotesList);
    } catch (error) {
      console.log('Error in fetching list', error);
      setError(true);
    }
  }, []);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (e) => {
    
    setValue({ ...value, name: e.target.value });
  };

  const handleColorChange = (color) => {
    setValue({ ...value, color });
    setError(false); // Reset error when color is selected
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.color) {
      setError(true);
      return;
    }
    setValue((prevValue) => {
      const incrementedId = prevValue.id + 1;
      const newValue = { ...prevValue, id: incrementedId };
      const updatedNotesList = [...notesList, newValue];
      setNotesList(updatedNotesList);
      localStorage.setItem("NotesList", JSON.stringify(updatedNotesList));
      return { ...newValue, name: "", color: "" };
    });
    closeModal();
  };


  const handleClick = (ind) => {
    setClick(ind);
    localStorage.setItem("Index", ind);

  }

  const navigate = useNavigate();




  return (
    <div className={isModalOpen ? 'app' : ''}>
      <div className='home-sec'>

        <div className='item-1' style={{ zIndex: isModalOpen ? -1 : 'auto' }}>

          <h3>Pocket Notes</h3>

          <div className='notes-names'>

            {notesList.map((ele, ind) => (
              <div key={ind} onClick={() => { handleClick(ind) }}
                style={{ backgroundColor: click === ind ? '#2F2F2F2B' : 'transparent', borderRadius: '1rem' }}
              >
                <div className='lg-device'>
                  <NotesCreation notesName={ele.name} bgColor={ele.color} />
                </div>

                <div className='sm-device' onClick={() => navigate("/" + ele.name, { replace: true })}>

                  <NotesCreation notesName={ele.name} bgColor={ele.color} />

                </div>
              </div>
            ))
            }

          </div>

          <div onClick={() => { openModal(); setError(true) }} className='add-items'>
            +
          </div>

        </div>

        <div>
          <div className='modal'>
            <div className='modal-styles'>

              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div style={{ marginLeft: '1rem', paddingTop: '2px' }}>
                  <h3>Create New group</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', margin: '1rem', marginRight: '2rem' }}>
                    <h3>Group Name : </h3>
                    <input type='text'
                      placeholder='Enter Group Name'
                      style={{
                        marginTop: '1rem',
                        marginLeft: '2rem',
                        borderRadius: '3rem',
                        borderColor: '#CCCCCC',
                        width: '15rem',
                        height: '2rem'
                      }}
                      value={value.name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                    

                  <div className='color-sec'>
                    <h3>Choose Colour</h3>
                    <div className='color-sec'>
                      {colors.map((ele) => (
                        <div key={ele}
                          className='choose-color'
                          style={{
                            backgroundColor: ele
                          }}
                          onClick={() => {
                            handleColorChange(ele);
                            setError(false)
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {error && <div style={{ color: 'red', textAlign: 'center' }}>Please select one color</div>}

                  {!error && <button type='submit' className='create-btn'>Create</button>}
                </form>
              </Modal>
            </div>
          </div>
        </div>

        {!notesList.length ? (<div className='item-2' style={{ zIndex: isModalOpen ? -1 : 'auto', color: '#292929' }}>
          <img style={{
            width: '30vw',
            marginTop: '3rem'
          }} src={logo} alt='' />

          <div>
            <h1>Pocket Notes</h1>
            <p style={{ margin: '0 10rem' }}>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5rem'
          }}>
            <img style={{ marginRight: '1rem' }} src={vector} alt='' />
            <p>end-to-end encrypted</p>
          </div>

        </div>)
          :
          (<div className='item-2' style={{ zIndex: isModalOpen ? -1 : 'auto', }}>
            <Notes id={click} />
          </div>)}

      </div>
    </div>
  );
}

export default HomeSection;

