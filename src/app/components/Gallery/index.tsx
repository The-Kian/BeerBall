import { useState } from "react";

const images = [
    "../../../storage/BeerballExplained1.png",
    "src/storage/BeerballExplained1.png"
]

const Gallery = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImage((prevImage) =>
            prevImage === 0 ? images.length - 1 : prevImage
    )
    }
    return (
        <div>
            <img src={images[currentImage]} />
            <button onClick={prevImage}>Prev</button>
            <button onClick={nextImage}>Next</button>
        </div>
    )
}

export default Gallery