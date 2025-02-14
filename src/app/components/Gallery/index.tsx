import { useState } from "react";

const images = [
    "/BeerballExplained1.png",
    "/BeerballExplained2.png",
    "/BeerballExplained3.png",
    "/BeerballExplained4.png",
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
            <img onClick={nextImage} src={images[currentImage]} />
            <button onClick={prevImage}>Prev</button>
            <button onClick={nextImage}>Next</button>
        </div>
    )
}

export default Gallery