import React from 'react'

function NotesCreation({ bgColor, notesName}) {
  
  const nameList = notesName.split(" ");
  let var1 = ""
  let var2 = ""
  let var3 = ""
  let var4 = ""

  if(nameList.length >= 1) {
    if(nameList.length === 1 && notesName[1]){
      var1 = notesName[0].toUpperCase();
      var2 = notesName[1].toUpperCase() ; 
    }
    else if(nameList.length === 1 && !notesName[1]) {
      var1 = notesName[0].toUpperCase();
    }
    else {
       var3 = nameList[0][0].toUpperCase();
       var4 = nameList[1][0].toUpperCase(); 
      
    }
  }
  return (
    <div className='item-1-container'>
           
           <div>

        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100" style={{backgroundColor: bgColor, borderRadius: '50%', marginRight : '2rem', textAlign: 'center'}} >
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="#fff">
            
            {nameList.length > 1 ? var3 + var4 : var1 + var2
            
          }
          
          </text>
        </svg>
           </div>

           <div>

        <h4>{notesName}</h4>
           </div>



    


    </div>
  )
}

export default NotesCreation