import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';

const Edit = () => {

  let id = useParams();
  let navgate = useNavigate();
  const [allEmp,setAllEmp]=useState(()=>{
    let epmloyes = localStorage.getItem("emp");
    
    return epmloyes ? JSON.parse(epmloyes) : [];
  })
  
  const [emp,setEmp]=useState(
    ()=>{
      console.log(id.index)
      let indexData = allEmp.findIndex((v,i)=>v.id==parseInt(id.index));
      return allEmp[indexData];
    }
  );
  
   const [hobby,setHobby]=useState(()=>{
    return emp.hoby
   });

   const [city,setCity]=useState(["Surat","Vapi","Tapi","Ghandhinagar"]);
  
  useEffect(()=>{
    localStorage.setItem("emp",JSON.stringify(allEmp));
  },[allEmp])
  



  const onInputChange=(e)=>{

    if(e.target.name=="hoby")
      {
        let hoby = [...hobby];
        if(e.target.checked)
        {
         hoby.push(e.target.value);
         setHobby(hoby)
        }
        else if(!e.target.checked)
        {
          hoby=hoby.filter((h)=>h!=e.target.value);
          setHobby(hoby);
        }
        console.log(hoby)
        setEmp({...emp,[e.target.name]:[...hoby]});
        return
      }

    setEmp({...emp,[e.target.name]:e.target.value});
  }

  const onFormSubmit=(e)=>{
    e.preventDefault();

    let employ = [...allEmp];
    let indexData = employ.findIndex((v,i)=>v.id==parseInt(id.index));
    employ[indexData].name=emp.name;
    employ[indexData].email=emp.email;
    employ[indexData].password=emp.password;
    employ[indexData].gender=emp.gender;
    employ[indexData].hoby=emp.hoby;
    employ[indexData].city=emp.city;


    setAllEmp([...employ])
    
    emp.name="";
    emp.email="";
    navgate("/view");
    
  }

  return (
    <div className="container">
        <h2>Enter Your Details</h2>
        <form onSubmit={(e)=>onFormSubmit(e)} id="dataForm">
            <label htmlFor="name">Name:</label>
            <input onChange={(e)=>onInputChange(e)} name="name" type="text" id="name" value={emp.name?emp.name:""} required />
            
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=>onInputChange(e)} name="email" type="email" id="email" value={emp.email?emp.email:""}  required />

            <label htmlFor="name">Password:</label>
            <input onChange={(e)=>onInputChange(e)} name="password" type="text" id="name" value={emp.password?emp.password:""} required />
            
            <label >Gender:</label>
            <input style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e)} name="gender" type="radio"  value="male" checked={emp.gender=="male"?"checked":""} /> Male
            <input style={{display:"inline",width:"3%"}}  onChange={(e)=>onInputChange(e)} name="gender" type="radio" value="female" checked={emp.gender=="female"?"checked":""} /> Female

            <label>Hobby:</label>
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Cricket" checked={hobby.includes("Cricket")?"checked":""}  /> Cricket
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Swiming"  checked={hobby.includes("Swiming")?"checked":""}  /> Swiming
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Dancing"  checked={hobby.includes("Dancing")?"checked":""}  /> Dancing
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Coding"  checked={hobby.includes("Coding")?"checked":""}  /> Coding

            <label>City</label>
            <select name='city'  onChange={(e)=>onInputChange(e)} >
                {
                    city.map((c)=>(
                        <option selected={emp.city==c ? true : false } value={c}>{c}</option>
                    ))
                }
            </select>

            <br></br>

            

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Edit