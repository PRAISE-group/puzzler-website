import React from 'react'

const FooterComponent = () => {
    return (
        <footer class="fixed bottom-0 left-0 z-20 items-center w-full bg-black text-white dark:bg-gray-900">
            <div class="w-full mx-auto max-w-screen-xl p-2 justify-center md:flex grid grid-row-1">
                <span className='text-sm text-gray-200 text-center dark:text-gray-400 px-10 '>Site developed by{' '}👨‍💻
                <a href="https://github.com/codersguild" className='underline hover:text-blue-400'>
                 Sumit Lahiri </a>
                 </span>
                <span class="text-sm text-gray-200 text-center dark:text-gray-400">
                    © 2023 <a href="https://github.com/PRAISE-group" class="underline hover:text-blue-400">Puzzler Team</a>. 
                    All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default FooterComponent
