'use client'
import { GrNext, GrPrevious} from 'react-icons/gr'

export default function Pagination({ currentPage, setCurrentPage, totalPages }) {

    const limit = 5
    const goToNextPage = () => {
        if (currentPage < totalPages)
            setCurrentPage((page) => page + 1);
    }
    const goToPreviousPage = () => {
        if (currentPage !== 1)
            setCurrentPage((page) => page - 1);
    }
    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / limit) * limit;
        return new Array(limit).fill().map((_, idx) => start + idx + 1);
    }
    const pageNumbers = getPaginationGroup();
    if (totalPages > 1)
    return (
        <div className='flex gap-2'>
            <button className='border-secondary bg-primary border-[0.5px] px-3 py-1' onClick={goToPreviousPage}><GrPrevious/></button>
            {pageNumbers.map((item, index) => {
                return (
                    item <= totalPages &&
                    <button
                        key={index}
                        onClick={changePage}
                        className={`${currentPage === item ? 'active underline bg-secondary text-primary disabled' : null} border-secondary bg-primary border-[0.5px] px-3 py-1`}
                    >{item}</button>
                    )
            })
            }
            {(totalPages > pageNumbers[limit-1]) &&  <div className='flex items-center'>...{totalPages}</div>}
            <button className='border-secondary bg-primary border-[0.5px] px-3 py-1' onClick={goToNextPage}><GrNext/></button>
        </div>
    )
}
