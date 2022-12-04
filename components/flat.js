import Link from "next/link"
import Image from "next/image"
import { memo } from "react";
export default memo(function Flat({ flat }) {
    console.log(flat);
    return (
        <div class="col-md-3">
            <div class="mb-2 p-1 shadow-sm rounded">
                <Link href={`/flats/${flat.id}`} className="my-link">
                    <Image src={
                        flat.Images[0]?.path ||
                        "https://res.cloudinary.com/dc24zff14/image/upload/v1670164426/xstrgjeyl5jf73zxtgpo.jpg"
                    } alt="flat-image" width="100" height="100" className="card-img"></Image>
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
})

