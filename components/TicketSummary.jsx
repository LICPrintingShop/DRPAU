"use client"

import { useState } from "react"

export default function TicketSummary({device,type,concern}){

const [ticketID] = useState(
"DRP-" + Math.floor(100000 + Math.random()*900000)
)

const [submitted,setSubmitted] = useState(false)

const submitTicket = async () => {

await fetch("YOUR_GOOGLE_SCRIPT_URL",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

ticketID:ticketID,
device:device,
type:type,
concern:concern,
branch:"108"

})

})

setSubmitted(true)

}

if(submitted){

return(

<div style={{
marginTop:"30px",
padding:"20px",
border:"1px solid #ddd",
borderRadius:"8px"
}}>

<h2>Ticket Submitted</h2>

<p>Please save your ticket ID</p>

<h1>{ticketID}</h1>

<p>
Use this ID to check the status of your request.
</p>

<button
onClick={()=>navigator.clipboard.writeText(ticketID)}
>
Copy Ticket ID
</button>

</div>

)

}

return(

<div style={{
marginTop:"30px",
padding:"20px",
border:"1px solid #ddd",
borderRadius:"8px"
}}>

<h3>Ticket Summary</h3>

<p><b>Device:</b> {device}</p>
<p><b>Request Type:</b> {type}</p>
<p><b>Concern:</b> {concern}</p>

<p><b>Ticket ID:</b> {ticketID}</p>

<button
onClick={submitTicket}
style={{
marginTop:"10px",
padding:"10px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px"
}}
>

Submit Ticket

</button>

</div>

)

}
