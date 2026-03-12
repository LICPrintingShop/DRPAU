import { useState } from "react"

export default function ConcernButtons({concern,setConcern}){

const [other,setOther] = useState("")

return(

<div style={{marginTop:"20px"}}>

<h3>Select your Concern</h3>

<button onClick={()=>setConcern("COR - BIR")}>
COR (Certificate of Registration)
</button>

<br/><br/>

<button onClick={()=>setConcern("Receipt ATP")}>
Receipt Need ATP
</button>

<br/><br/>

<button onClick={()=>setConcern("Books of Account")}>
Books of Account
</button>

<br/><br/>

<button onClick={()=>setConcern("Mayor Permit")}>
Mayor's Permit
</button>

<br/><br/>

<button onClick={()=>setConcern("Withholding Tax 2307")}>
Withholding Tax / 2307
</button>

<br/><br/>

<h4>Others</h4>

<input
placeholder="Type your concern"
value={other}
onChange={(e)=>setOther(e.target.value)}
style={{
width:"100%",
padding:"10px",
border:"1px solid #ccc",
borderRadius:"6px"
}}
/>

<button
onClick={()=>setConcern(other)}
style={{marginTop:"10px"}}
>
Submit Other Concern
</button>

</div>

)

}
