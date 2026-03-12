"use client"

import { useEffect, useState } from "react"
import DeviceSelector from "../../components/DeviceSelector"
import RequestType from "../../components/RequestType"
import ConcernButtons from "../../components/ConcernButtons"
import TicketSummary from "../../components/TicketSummary"

export default function ClientPage(){

const [device,setDevice] = useState("")
const [type,setType] = useState("")
const [concern,setConcern] = useState("")
const [ticketID,setTicketID] = useState("")

useEffect(()=>{

const width = window.innerWidth

if(width <= 768){
setDevice("Mobile")
}else{
setDevice("Desktop")
}

},[])

return(

<div style={{
maxWidth:"600px",
margin:"auto",
padding:"20px",
fontFamily:"Arial"
}}>

<h1>Client Assistance Portal</h1>

<DeviceSelector device={device}/>

<RequestType
type={type}
setType={setType}
/>

{(type === "problem" || type === "inquiry") && (

<ConcernButtons
concern={concern}
setConcern={setConcern}
/>

)}

{type === "status" && (

<div style={{marginTop:"20px"}}>

<h3>Check Ticket Status</h3>

<input
placeholder="Enter Ticket ID"
value={ticketID}
onChange={(e)=>setTicketID(e.target.value)}
style={{
width:"100%",
padding:"10px",
border:"1px solid #ccc",
borderRadius:"6px"
}}
/>

<button
style={{
marginTop:"10px",
padding:"10px",
width:"100%",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px"
}}
>
Check Status
</button>

</div>

)}

{concern && (

<TicketSummary
device={device}
type={type}
concern={concern}
/>

)}

</div>

)
}
