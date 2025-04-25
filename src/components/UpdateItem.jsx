import axios, { all } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import DoorCard from "./DoorCard";
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;



const UpdateItem = ({ item }) => {
    // 1. Create a state for the form
    // 2. Create a function to handle the form submission
    // 3. Create a function to handle the form input changes
    const [doors,setDoors] = useState([]);
    const [doorForm,setDoorForm] = useState({
        name:"",
        status:""
    });

    async function getDoors() {
        try {
            const data = await axios.get(API_URI);
            console.log(data.data);
            setDoors(data.data);
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
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
            await axios.post(API_URI,doorForm);
            alert("Data added successfully..");
            getDoors();
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    useEffect(()=>{
        getDoors();
    },[])

    // your code here
    return (
        <div>
            {
                doors.map((ele)=>(
                    <DoorCard key={ele.id} door={ele} getDoors={getDoors} />
                ))
            }
            <div>
                <form action="" onSubmit={handelForm} >
                <input type="text" value={doorForm.name} onChange={handelInput} name="name" placeholder="Enter door name....." />
                <input type="text" value={doorForm.status} onChange={handelInput} name="status" placeholder="Enter status.." />
                <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;

