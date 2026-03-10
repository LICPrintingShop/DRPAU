"use client"
export default function DeviceSelector({ device, setDevice }) {

return (
<div>
<h3>Device Used</h3>

<button onClick={()=>setDevice("Phone")}>
📱 Phone
</button>

<button onClick={()=>setDevice("Desktop")}>
💻 Desktop
</button>

</div>
)
}
