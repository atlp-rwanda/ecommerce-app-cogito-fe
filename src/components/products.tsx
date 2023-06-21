import { faFilter, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Products = () =>{
    return (
        <div className="text-center flex flex-col items-center w-[80%] m-auto">
            <p className="m-auto text-2xl font-bold mt-6">Explore Products</p>
            <div className='flex justify-between mt-6 w-full'>
                <div className='flex items-center justify-center border-[1px] border-[#9C9EBA] py-1 px-11 rounded-md'>
                    <p className='pr-2'>Filter</p>
                    <FontAwesomeIcon icon={faFilter} className=''/>
                </div>
                <div className='flex items-center justify-center border-[1px] border-[#9C9EBA] py-1  px-11 rounded-md'>
                    <p className='pr-2'>Sort</p>
                    <FontAwesomeIcon icon={faFilter} className=''/>
                </div>
            </div>
            <div className='h-[90vh] w-full mt-6'>
                <div className='bg-[#F5F6F6] h-[50%] w-full rounded-lg flex items-center justify-center'>
                    <img src="https://res.cloudinary.com/doxc03jzw/image/upload/v1688725210/gray-duffle-bag-unisex-accessory-removebg-preview_drx1nr.png" alt="" className='w-[80%] mt-6' />
                </div>
                <div className='h-[50%] mt-4'>
                    <div className='flex w-full justify-between font-medium'>
                        <p>Base Camp Duffel M</p>
                        <p>$239.00</p>
                    </div>
                    <p className='text-sm text-left mt-2 text-[#C6C4C4]'>This is the product description </p>
                    <div className='flex mt-4 justify-between items-center'>
                        <button className='border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl' >Add to cart</button>
                        <div className='border-[1px] border-[#003D29] rounded-3xl'>
                            <FontAwesomeIcon icon={faHeartCirclePlus} className='text-[#003D29] text-xl p-1.5'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;