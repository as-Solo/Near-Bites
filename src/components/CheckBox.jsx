import React, { useState } from 'react'


//! elementos del padre
// const [users, setUsers] = useState([
//   {name_01:false},
//   {name_02:false},
//   {name_03:true},
//   {name_04:false}
// ]) 


// {users.map((user, index)=>{
//   const dato = Object.keys(user)[0]
//   const info = user[dato]
//   // console.log(dato, user[dato])
//   return (
//   <CheckBox key={index} value={info} setValue={setUsers} name={dato} users={users} index={index}/>
// )   
// })}

function CheckBox(props) {

  const {value, setValue, texto_01, texto_02, name, users, index} = props

	let etiqueta_01 = texto_01 || "user"
	let etiqueta_02 = texto_02 || "owner"

	const handleCheck = (e)=>{

    const clone = structuredClone(users)
    clone[index][e.target.name] = e.target.checked
    setValue(clone)
	}

	const pastillaNormal = {
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		width:"32px",
		height:"15px",
		borderRadius:"30px",
		border:`solid 2px ${value?'rgb(70, 130, 182)':'rgb(180, 180, 180)'}`,
		backgroundColor:value?'rgba(70, 130, 182, 0.3)':'rgba(180, 180, 180, 0)',
		transition:"all .2s ease",
		position:"relative",
		flexShrink:0,
	}

	const pelotica = {
		height:"100%",
		aspectRatio:"1/1",
		borderRadius:"100%",
		backgroundColor:value?'rgb(70, 130, 182)':'rgb(180, 180, 180)',
		position:"absolute",
		left: value?"17px":"-1px",
		transition:"all .2s ease",

	}

	const texto = {
		color: value?'rgb(70, 130, 182)':'rgb(120, 120, 120)',
		textAlign:"rigth",
		pointerEvents:"none",
		fontWeight:"700",
		margin:"0",
        fontSize:".5rem",
        transition:"all .2 ease"
	}

	const container = {
		display:"flex",
        flexDirection:"column",
		justifyContent:"flex-end",
		alignItems:"center",
		width:"100%",
		gap:"0px",
		border:"1px solid green"
	}
  return (
      
    <div style={container}>
    
      <p style={texto}>{value?etiqueta_02:etiqueta_01}</p>

      <div style={pastillaNormal}>
        <div style={pelotica}></div>
        <input onChange={(e)=>handleCheck(e)} type="checkbox" name={name} value={value} style={{opacity:"0", position:"absolute", width:"100%"}}/>
      </div>
    </div>

	)
}

export default CheckBox