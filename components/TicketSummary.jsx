export default function TicketSummary({device,type,concern}){

const ticketID = "DRP-" + Math.floor(Math.random()*100000)

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
