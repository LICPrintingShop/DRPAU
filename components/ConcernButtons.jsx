"use client"

import { useState } from "react"

export default function ConcernButtons({concern,setConcern}){

const [showChat,setShowChat] = useState(false)
const [message,setMessage] = useState("")

const selectConcern = (value) => {

setConcern(value)
setShowChat(false)

}

const handleOther = () => {

setConcern("")
setShowChat(true)

}

const submitOther = () => {

if(message.trim() !== ""){
setConcern(message)
}

}

return(

<div style={{marginTop:"20px"}}>

<h3>Select your Concern</h3>

<button onClick={()=>selectConcern("COR - BIR")}>
COR (Certificate of Registration)
</button>

<br/><br/>

<button onClick={()=>selectConcern("Receipt ATP")}>
Receipt Need ATP
</button>

<br/><br/>

<button onClick={()=>selectConcern("Books of Account")}>
Books of Account
</button>

<br/><br/>

<button onClick={()=>selectConcern("Mayor Permit")}>
Mayor's Permit
</button>

<br/><br/>

<button onClick={()=>selectConcern("Withholding Tax 2307")}>
Withholding Tax / 2307
</button>

<br/><br/>

<button onClick={handleOther}>
Others
</button>

{/* CHATBOX FOR OTHER CONCERNS */}

{showChat && (

<div style={{
marginTop:"20px",
padding:"15px",
border:"1px solid #ddd",
borderRadius:"8px"
}}>

<h4>Describe your concern</h4>

<textarea
placeholder="Type your problem or inquiry here..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
style={{
width:"100%",
height:"100px",
padding:"10px",
border:"1px solid #ccc",
borderRadius:"6px"
}}
/>

<button
onClick={submitOther}
style={{
marginTop:"10px",
padding:"10px",
background:"#111",
color:"white",
border:"none",
borderRadius:"6px"
}}
>

Submit Concern

</button>

</div>

)}

</div>

)

}
