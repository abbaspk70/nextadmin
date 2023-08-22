
import ProductForm from "@/components/product/productEdit/ProductForm";
import { createProduct, updateProduct } from "@/src/actions/productAction";
import { getOneProduct } from "@/src/actions/productAction";

export default async function page({searchParams}) {
    //get product id from search
    var {id} = searchParams;
    if(id) {
    const response = await getOneProduct({_id: id});
    if(response) {
        var data = response;
    }
}
    const handleSubmit = async (formData) => {
        'use server';
        if(id) {
            formData.append('_id', id);
            await updateProduct(formData);
            return
        }
        const response = await createProduct(formData);
        if (response.status === "error") {
            console.log(response.message);
        }
    };
    return (
        <div className='my-20 px-5 md:ml-[300px] xl:px-80'>
            <div className='border-[0.5px] pb-5'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Create Product
                </div>
                <ProductForm onSubmit={handleSubmit} data={data}/>
            </div>
        </div>
    )
}
