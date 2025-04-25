import axios from 'axios';
import React, { useState } from 'react';
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;


const DoorCard = ({door,getDoors}) => {
    const [isEdit,setIsEdit] = useState(false);
    const [doorForm,setDoorForm] = useState({
        name:door.name,
        status:door.status
    });

    async function deleteDoor() {
        try {
            await axios.delete(`${API_URI}/${door.id}`)
            alert("Deleted successfully..");
            getDoors();
        } catch (error) {
            console.log(error);
            alert("Something went wrong deleting door..");
        }
        
    }

    function handelInput(event){
        const key = event.target.name;
        const value = event.target.value;
        setDoorForm({...doorForm,[key]:value});
    }

    async function handelForm(e){
        e.preventDefault();
        try {
            const {name,status} = doorForm;
            if(!name || !status){
                alert("Please enter all deatials..");
                return;
            }
            await axios.put(`${API_URI}/${door.id}`,doorForm);
            alert("Data edited successfully..");
            getDoors();
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }


  return (
    <>
    {
        !isEdit?<div>
        <h3>Name : {door.name}</h3>
        <p>Status : {door.status}</p>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <button onClick={()=>setIsEdit(true)}>Edit</button>
          <button onClick={deleteDoor}>Delete</button>
        </div>
      </div>:<div>
        <form action="" onClick={handelForm}>
            <input type="text" value={doorForm.name} onChange={handelInput} name="name" placeholder="Enter door name....." />
            <input type="text" value={doorForm.status} onChange={handelInput} name="status" placeholder="Enter status.." />
            <input type="submit" />
        </form>
        <button onClick={()=>setIsEdit(false)}>Close Edit Mode</button>
      </div>
    }
    </>
  )
}

export default DoorCard
