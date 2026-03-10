"use client"

import { useEffect, useState } from "react"

export default function Admin(){

const [tickets,setTickets] = useState([])

useEffect(()=>{

fetch("/api/tickets")
.then(res=>res.json())
.then(data=>setTickets(data))

},[])

return(

<div>

<h1>Admin Dashboard</h1>

<table border="1">

<thead>
<tr>
<th>Device</th>
<th>Type</th>
<th>Concern</th>
</tr>
</thead>

<tbody>

{tickets.map((t,i)=>(
<tr key={i}>
<td>{t.device}</td>
<td>{t.type}</td>
<td>{t.concern}</td>
</tr>
))}

</tbody>

</table>

</div>

)
}
