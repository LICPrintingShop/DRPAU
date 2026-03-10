import Link from "next/link"

export default function Home(){

return(

<div>

<h1>Client Support System</h1>

<Link href="/client">
Client Portal
</Link>

<br/>

<Link href="/admin">
Admin Dashboard
</Link>

</div>

)

}
