"use client"

export default function TicketSummary({device,type,concern}){

async function submitTicket(){

await fetch("/api/tickets",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
device,
type,
concern
})
})

alert("Ticket Submitted")
}

return(

<div>

<h3>Summary</h3>

<p>Device: {device}</p>
<p>Type: {type}</p>
<p>Concern: {concern}</p>

<button onClick={submitTicket}>
Submit Ticket
</button>

</div>

)
}
