import DataLoading from "@/components/loaders/DataLoading";
import SearchProduct from "@/components/product/SearchProduct";

export default async function page() {
  return (
    <div className='my-20 px-5 xl:px-28 md:ml-[300px]'>
      <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
        <h2>Products</h2>
        </div>
      <div className='p-5  border-2 shadow-lg shadow-secondary/20 text-black rounded-b-md'>
        <div className='flex flex-col gap-5'>
          <SearchProduct/>
        </div>
      </div>
    </div>
  )
}
