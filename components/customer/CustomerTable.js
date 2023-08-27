
import Link from 'next/link'

export default function CustomerTable({ customers }) {

    if (customers.length > 0)
    return (
        <div className='overflow-auto'>
        <div className='w-full table'>
            <div className='table-header-group text-primary'>
                <div className='table-row bg-accent'>
                    <div className='p-2 table-cell'>Id</div>
                    <div className='p-2 table-cell'>Name</div>
                    <div className='p-2 table-cell '>Phone</div>
                    <div className='p-2 table-cell'>Email</div>
                </div>
            </div>
            <div className='[&>*:nth-child(even)]:bg-slate-200 table-row-group bg-slate-100'>
                {customers.map((customer,index) =>{
                    return (
                        <Link key={index} href={`/dashboard/customers/${customer._id}`} className='table-row border-4 border-black'>
                        <div className='p-2 table-cell border-b-2'>{customer.customerId}</div>
                        <div className='p-2 table-cell capitalize border-b-2'>{customer.firstName} {customer.lastName}</div>
                        <div className='p-2 table-cell border-b-2'>{customer.contact.phone}</div>
                        <div className='p-2 table-cell border-b-2'>{customer.contact.email}</div>
                    </Link>
                    )
                })}
            </div>
        </div>
        </div>
    )
}
