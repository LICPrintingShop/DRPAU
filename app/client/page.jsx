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

// AUTO DETECT DEVICE
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

<h1 style={{fontWeight:"500"}}>
Client Assistance Portal
</h1>

<p style={{color:"#777"}}>
Device detected: {device}
</p>

{/* REQUEST TYPE */}

<RequestType
type={type}
setType={setType}
/>

{/* SHOW CONCERNS ONLY IF PROBLEM OR INQUIRY */}

{(type === "problem" || type === "inquiry") && (

<ConcernButtons
concern={concern}
setConcern={setConcern}
/>

)}

{/* STATUS CHECK */}

{type === "status" && (

<div style={{marginTop:"20px"}}>

<h3>Check Ticket Status</h3>

<input
placeholder="Enter Ticket ID"
value={ticketID}
onChange={(e)=>setTicketID(e.target.value)}
style={{
padding:"10px",
width:"100%",
border:"1px solid #ccc",
borderRadius:"6px"
}}
/>

<button
style={{
marginTop:"10px",
padding:"10px",
width:"100%",
border:"none",
background:"#111",
color:"white",
borderRadius:"6px"
}}
>
Check Status
</button>

</div>

)}

{/* SUMMARY */}

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
