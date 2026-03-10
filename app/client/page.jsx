"use client"

import { useState } from "react"
import DeviceSelector from "../../components/DeviceSelector"
import RequestType from "../../components/RequestType"
import ConcernButtons from "../../components/ConcernButtons"
import TicketSummary from "../../components/TicketSummary"

export default function ClientPage(){

const [device,setDevice] = useState("")
const [type,setType] = useState("")
const [concern,setConcern] = useState("")

return(

<div>

<h1>Client Assistance Portal</h1>

<DeviceSelector
device={device}
setDevice={setDevice}
/>

<RequestType
type={type}
setType={setType}
/>

<ConcernButtons
concern={concern}
setConcern={setConcern}
/>

{concern && (
<TicketSummary
device={device}
type={type}
concern={concern}
/>
)}

</div>

)
}
