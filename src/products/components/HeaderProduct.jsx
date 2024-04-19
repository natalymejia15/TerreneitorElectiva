import React from 'react'

export const HeaderProduct = () => {
  return (
    <>
        <div class="md:flex max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:w-48" src="<https://placekitten.com/500/500>" alt="A cute kitten"/>
            </div>
            <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Kitten</div>
                <a class="block mt-1 text-lg leading-tight font-medium text-black hover:underline" href="#" >Cute calico kitten</a>
                <p class="mt-2 text-gray-500">This adorable kitten is looking for a loving home. It's incredibly friendly and loves to play. </p>
            </div>
        </div>    
    </>
  )
}
