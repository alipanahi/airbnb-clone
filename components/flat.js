import Link from "next/link"
function Flat({flat}) {
    return (
        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">{flat.name}</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">${flat.price}<small class="text-muted fw-light">/night</small></h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>{flat.address}</li>
                        <li>{flat.booked}</li>
                        <li>{flat.category}</li>
                        <li>{flat.rooms}</li>
                    </ul>
                    <Link href={`/flats/${flat.id}`}><button type="button" class="w-100 btn btn-lg btn-outline-primary">show</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Flat