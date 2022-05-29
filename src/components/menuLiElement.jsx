import { getMainMenu } from "lib/api";
import urlBuilder from "lib/imageUrl";

export default function MenuLiElement({ categories }) {


  return (
    
    categories.map((category, id) => (
        <li key={id} >
          <a href={`/category/`+category.attributes.slug} class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">{category.attributes.name}</a>
        </li>
      ))
    

  )
}
