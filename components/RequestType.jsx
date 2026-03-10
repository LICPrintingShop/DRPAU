"use client"

export default function RequestType({ type, setType }) {

return (
<div>

<h3>Type of Request</h3>

<button onClick={()=>setType("Problem")}>
Problems
</button>

<button onClick={()=>setType("Inquiry")}>
Inquiry
</button>

</div>
)
}
