import urlBuilder from "lib/imageUrl"

export default function ImagePostCarousel(props) {
    const image = props.image
    return (<>
        {image.data.length > 1 &&

            <div id="default-carousel" class="relative " data-carousel="static">
                {/* <!-- Carousel wrapper --> */}
                <div class="overflow-hidden relative rounded-lg h-screen  ">

                    {/* <!-- Items --> */}
                    {image.data.map((item) => (
                        <div key={item.attributes.name} class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img key={item.attributes.url} src={urlBuilder(item.attributes.url)} class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={item.attributes.title} />
                        </div>
                    ))}
                </div>
                {/* <!-- Slider controls --> */}
                <button type="button" class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        <span class="hidden">Previous</span>
                    </span>
                </button>
                <button type="button" class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
                    <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        <span class="hidden">Next</span>
                    </span>
                </button>
            </div>
        }
        {image.data.length == 1 &&

            <div class="relative ">
                {/* <!-- Carousel wrapper --> */}
                <div class="overflow-hidden relative rounded-lg h-screen  ">
                    <div key={image.data[0].attributes.name} data-carousel-item>
                        <img key={image.data[0].attributes.url} src={urlBuilder(image.data[0].attributes.url)} class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={image.data[0].attributes.title} />
                    </div>
                </div>
            </div>
        }

    </>
    )
}
