import { getMainMenu } from "lib/api";
import urlBuilder from "lib/imageUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "./menu";
import { faUtensils, faMugHot } from "@fortawesome/free-solid-svg-icons";
export default function TopPage({ menu }) {


    return (
        <>
            <FontAwesomeIcon icon={faMugHot} className='text-9xl' />
            <h1 className='text-6xl text-center'> oh jak słodko</h1>
            {/* <img width={450} height={450} className="mx-auto" src={urlBuilder(mainImage.mainImages.data[0].attributes.Image.data.attributes.url)} /> */}
            <Menu menu={menu} />

        </>
    )
}
