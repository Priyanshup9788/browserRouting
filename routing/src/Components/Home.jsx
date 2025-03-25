import React, { useEffect, useState } from 'react'

const Home = () => {

  const [allEmp,setAllEmp]=useState(()=>{
    let epmloyes = localStorage.getItem("emp");

    return epmloyes ? JSON.parse(epmloyes) : [];
  })

  const [newEmp,setNewEmp]=useState(
    {
      name:"",email:"",password:"",gender:"",hoby:[],city:""
    }
  );

  const [hobby,setHobby]=useState([]);

  const [city,setCity]=useState(["Surat","Vapi","Tapi","Ghandhinagar"]);

  useEffect(()=>{
    localStorage.setItem("emp",JSON.stringify(allEmp));
  },[allEmp])

  const onInputChange=(e)=>{
    console.log(e.target.value)
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
      setNewEmp({...newEmp,[e.target.name]:[...hoby]});
      return
    }
    setNewEmp({...newEmp,[e.target.name]:e.target.value});
  }

  const onFormSubmit=(e)=>{
    e.preventDefault();
    
    let newId = allEmp.length > 0 ? Math.max(...allEmp.map((prod) => prod.id) )+ 1 : 1
    if(!newEmp.name || !newEmp.email){
      alert("Fill all field");
      return;
    }
    setAllEmp([...allEmp,{...newEmp , id:newId}]);
    newEmp.name="";
    newEmp.email="";
    newEmp.password="";
    newEmp.gender="";
    newEmp.hoby=[];
    newEmp.city="";
    setHobby([]);
  }

  return (
    <div className="container">
        <h2>Enter Your Details</h2>
        <form onSubmit={(e)=>onFormSubmit(e)} id="dataForm">
            <label htmlFor="name">Name:</label>
            <input onChange={(e)=>onInputChange(e)} name="name" type="text" id="name" value={newEmp.name} required />
            
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=>onInputChange(e)} name="email" type="email" id="email" value={newEmp.email} required />

            <label htmlFor="name">Password:</label>
            <input onChange={(e)=>onInputChange(e)} name="password" type="text" id="password" value={newEmp.password} required />

            <label >Gender:</label>
            <input style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e)} name="gender" type="radio"  value="male" checked={newEmp.gender=="male"?"checked":""} /> Male
            <input style={{display:"inline",width:"3%"}}  onChange={(e)=>onInputChange(e)} name="gender" type="radio" value="female" checked={newEmp.gender=="female"?"checked":""} /> Female
         

            <label>Hobby:</label>
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Cricket" checked={hobby.includes("Cricket")?"checked":""}  /> Cricket
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Swiming"  checked={hobby.includes("Swiming")?"checked":""}  /> Swiming
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Dancing"  checked={hobby.includes("Dancing")?"checked":""}  /> Dancing
            <input type='checkbox' style={{display:"inline",width:"3%"}} onChange={(e)=>onInputChange(e) } name="hoby" value="Coding"  checked={hobby.includes("Coding")?"checked":""}  /> Coding

            <label>City:</label>
            <select name='city' onChange={(e)=>onInputChange(e)} >
              <option value="" selected>--- Select City ---</option>
                {
                    city.map((c)=>(
                        <option value={c}>{c}</option>
                    ))
                }
            </select>

            <br></br>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Home