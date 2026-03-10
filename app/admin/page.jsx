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

<div className="page">

<h1 className="title">Admin Dashboard</h1>

<div className="card">

<div className="tableWrapper">

<table className="table">

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

<td>
<span className={`badge ${t.device === "Desktop" ? "desktop":"phone"}`}>
{t.device}
</span>
</td>

<td>
<span className={`badge ${t.type === "Inquiry" ? "inquiry":"problem"}`}>
{t.type}
</span>
</td>

<td>{t.concern}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

<style jsx>{`

.page{
background:#f4f6f9;
min-height:100vh;
padding:30px;
}

.title{
font-size:28px;
margin-bottom:20px;
}

.card{
background:white;
padding:20px;
border-radius:10px;
box-shadow:0 4px 12px rgba(0,0,0,0.1);
}

.tableWrapper{
overflow-x:auto;
}

.table{
width:100%;
border-collapse:collapse;
}

.table th{
background:#2563eb;
color:white;
text-align:left;
padding:12px;
}

.table td{
padding:12px;
border-bottom:1px solid #ddd;
}

.table tr:hover{
background:#f1f5f9;
}

.badge{
padding:4px 10px;
border-radius:20px;
font-size:12px;
font-weight:bold;
}

.desktop{
background:#dbeafe;
color:#1e40af;
}

.phone{
background:#dcfce7;
color:#166534;
}

.inquiry{
background:#fef3c7;
color:#92400e;
}

.problem{
background:#fee2e2;
color:#991b1b;
}

@media(max-width:768px){

.title{
font-size:22px;
}

.table th,.table td{
font-size:14px;
padding:10px;
}

}

`}</style>

</div>

)
}
