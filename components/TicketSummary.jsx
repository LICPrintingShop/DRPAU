"use client"

import { useState } from "react"

export default function TicketSummary({device,type,concern}){

const [ticketID] = useState(
"DRP-" + Math.floor(100000 + Math.random()*900000)
)

const [email,setEmail] = useState("")
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
branch:"108",
email:email

})

})

setSubmitted(true)

}

const downloadReceipt = () => {

const text = `
DR PAU CLIENT TICKET RECEIPT

Ticket ID: ${ticketID}
Device: ${device}
Request Type: ${type}
Concern: ${concern}

Status: RECEIVED

Please keep this ticket ID to track your request.
`

const blob = new Blob([text],{type:"text/plain"})
const url = URL.createObjectURL(blob)

const a = document.createElement("a")
a.href = url
a.download = ticketID + ".txt"
a.click()

}

if(submitted){

return(

<div style={{
marginTop:"30px",
padding:"25px",
border:"1px solid #ddd",
borderRadius:"10px"
}}>

<h2>Ticket Submitted</h2>

<p>Please save your Ticket ID</p>

<h1 style={{letterSpacing:"2px"}}>
{ticketID}
</h1>

<p>
Use this ID to track your request status.
</p>

<div style={{marginTop:"20px"}}>

<button
onClick={()=>navigator.clipboard.writeText(ticketID)}
style={{marginRight:"10px"}}
>
Copy Ticket ID
</button>

<button
onClick={downloadReceipt}
>
Download Receipt
</button>

</div>

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

<h4>Email (optional)</h4>

<input
placeholder="Enter email to receive ticket"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"10px",
border:"1px solid #ccc",
borderRadius:"6px"
}}
/>

<button
onClick={submitTicket}
style={{
marginTop:"15px",
padding:"10px",
width:"100%",
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
