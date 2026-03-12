export default function RequestType({type,setType}){

return(

<div style={{marginBottom:"20px"}}>

<h3>Type of Request</h3>

<button onClick={()=>setType("problem")}>
Problem
</button>

<button onClick={()=>setType("inquiry")} style={{marginLeft:"10px"}}>
Inquiry
</button>

<button onClick={()=>setType("status")} style={{marginLeft:"10px"}}>
Check Status
</button>

</div>

)

}
