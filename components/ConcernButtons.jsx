"use client"
import { concerns } from "../data/concerns"

export default function ConcernButtons({ concern, setConcern }) {

return (
<div>

<h3>Select Your Concern</h3>

{concerns.map((c)=>(
<button
key={c}
onClick={()=>setConcern(c)}
>
{c}
</button>
))}

</div>
)
}
