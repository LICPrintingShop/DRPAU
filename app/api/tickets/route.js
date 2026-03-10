let tickets = []

export async function GET(){

return Response.json(tickets)

}

export async function POST(req){

const data = await req.json()

tickets.push(data)

return Response.json({
message:"ticket created"
})

}
