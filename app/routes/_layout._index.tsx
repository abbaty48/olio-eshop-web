import { useCallback, useState } from "react"
import { Menu } from "~/components/menu"
import { Link } from "@remix-run/react"
import clsx from "clsx"

/* TODO: return these images from server using loader function */
const slideIMGs = [
    '5a01740dd8e105e0caa03ed5685482517.avif',
    '85aa4eaa41ac03c504183db5b0adbec6b.avif',
    '0eaba7e1872277f1a3272618b0f6ebdb3.avif',
    '25c886bd73f081c1a54331ab1738755e2.avif'
]

function MotionSlider() {
    const [feature, set] = useState(() => slideIMGs[0])
    const slideAt = useCallback((index = 0) => set(slideIMGs[index]), [])
    return <div className={`w-full h-full`}>
        <img src={`public/features/${feature}`} role="presentation" alt="" />
        <ul className="absolute bottom-10 right-20 flex gap-4 group"> {
            slideIMGs.map((slide, index) => (
                <li key={index} onClick={() => slideAt(index)} className={clsx(
                    'w-4 h-4 rounded-full ring-1 motion-preset-slide-up motion-delay-75 motion-preset-fade motion-preset-bounce group-hover:cursor-pointer hover:motion-preset-shrink motion-ease-in-out',
                    slide === feature && 'ring-2 ring-primary motion-preset-pulse motion-duration-1000 motion-ease-spring-smooth',
                )}></li>
            ))
        }
        </ul>
    </div>
}

export default function () {
    return <section className="relative h-full overflow-hidden" aria-label="Main Home page">
        <div className="absolute left-1/2 -translate-x-1/2 text-center uppercase
         motion-preset-fade space-y-7 py-4" aria-labelledby="#p-index">
            <h1 className="text-[10rem] md:text-[22rem] font-thin motion-preset-slide-up">Olio</h1>
            <p id="p-index" className="text-[1.8rem] md:text-[3.2rem] font-light motion-preset-slide-down text-pretty">Ergonomic Furniture's for Home and Office.</p>
            <Link to={'/products'} className="inline-block py-2 px-4 md:py-4 md:px-10 bg-primary md:text-[1.8rem] text-white font-black mx-auto rounded-full hover:motion-preset-focus">View Products</Link>
        </div>
        <Menu />
        <MotionSlider />
    </section>
}
