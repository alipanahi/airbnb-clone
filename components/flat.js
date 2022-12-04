import Link from "next/link"
import Image from "next/image"

function Flat({ flat }) {
    console.log(flat);
    return (
        <div class="col-md-3">
            <div class="mb-2 p-1 shadow-sm rounded">
                <Link href={`/flats/${flat.id}`} className="my-link">
                    <Image src="https://images.unsplash.com/photo-1568941159284-3b299541ee63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" alt="flat-image" width="100" height="100" className="card-img"></Image>
                    <p className="card-title m-2">{ flat.address }</p>
                    <div class="card-body mb-3">
                        {flat.name} - 
                        {flat.rooms} -
                        {flat.price}$ / Night
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Flat