import { getMainMenu } from "lib/api";
import urlBuilder from "lib/imageUrl";
import MenuLiElement from "./menuLiElement";

export default function Menu({ menu }) {


  return (
    <nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <div class="mx-auto justify-center items-center w-full flex w-auto order-1" id="mobile-menu-3">
          <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <div class=" font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center">
                <a href="/">
                  Strona główna
                </a>
              </div>
            </li>
            {/* <li>
              <div class=" font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center">
                <a href="/about-me">
                  O mnie
                </a>
              </div>
            </li>
            <li>
              <div class=" font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center">
              <a href="/contact">
                  Kontakt
                </a>
              </div>
            </li> */}



            {/* Loop */}


            {menu.mainCategories.data.map((mainCategory, id) => (
              <li key={id}>
                <button key={id} class=" font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button" data-dropdown-toggle={`dropdown-` + id}>{mainCategory.attributes.name} <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div key={id} class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4" id={`dropdown-` + id}>
                  <ul key={id} class="py-2" aria-labelledby="dropdown">
                    <MenuLiElement categories={mainCategory.attributes.categories.data} />
                  </ul>
                </div>
              </li>
            ))}


          </ul>
        </div>
      </div>
    </nav>


  )
}
