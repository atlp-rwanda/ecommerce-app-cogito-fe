import { faMagnifyingGlass, faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import RatingStars from 'react-rating-stars-component';

const Wishlist=()=>{
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        setSearchClicked(!searchClicked);
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    return(
        <>
            <div className="text-left flex flex-col items-start w-[80%] m-auto lm:w-[70%] md:w-[80%] lg:w-[90%]">
                <p className="text-2xl font-bold mt-8">My Wishlist</p>
                <div className="flex justify-between mt-8 w-full">
                    <div className="border-[1px] border-[#9C9EBA] text-[#9C9EBA] py-1.5 px-3 rounded-lg flex items-center justify-between h-fit mr-2 w-[50%] md:w-[40%] ll:w-[28vw]">
                        <input
                        type="text"
                        className="focus:outline-none w-full text-sm md:text-base"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        />
                        <FontAwesomeIcon className="text-[#9C9EBA] cursor-pointer" icon={faMagnifyingGlass} onClick={handleSearch} data-testid="search-button" />
                    </div>
                    <button className="text-sm md:text-base text-[#EA3A5B] py-1.5 px-3 md:px-4 border-[1px] border-[#EA3A5B] rounded-lg opacity-80 border-opacity-80">Empty Wishlist</button>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 lg:grid-cols-3">
                    <div className="relative h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full my-10 mt-6 md:mb-6">
                        <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden ">
                            {/* {product.image[0]?( */}
                                <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" className="w-[100%] mt-6 object-cover object-top" />
                            {/* ):(
                                <FontAwesomeIcon icon={faImage}/>
                            )} */}
                        </div>
                        <div className="absolute inset-y-0 left-[8%] top-[50%] h-[70px] w-[70px] rounded-full overflow-hidden mr-1">
                            <img src="https://images.unsplash.com/photo-1639781436072-897a64a9bc42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyJTIwa2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='h-full w-full object-cover'/>
                        </div>
                        <div className="h-[50%] mt-10 ml-4">
                            <div className="flex w-full justify-between font-medium">
                            <p>Burger King</p>
                            <p>$30</p>
                            </div>
                            <div className="flex items-center ">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-1"/>
                                <p className="text-sm text-left mt-2">Kibagabaga KG43Str</p>
                            </div>
                            <div className="pointer-events-none">
                                <RatingStars
                                    count={5}
                                    value={3}
                                    size={24}
                                    activeColor="#003D29"
                                    edit={false}
                                />
                            </div>
                            <div className="flex mt-2 justify-between items-center">
                            <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                            <div className="border-[1px] border-[#EA3A5B] rounded-[100%] shadow-md border-opacity-80">
                                <FontAwesomeIcon icon={faTrash} className="text-[#EA3A5B] px-2 py-1.5 opacity-80" />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6 my-10 md:mb-6">
                        <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden ">
                            {/* {product.image[0]?( */}
                                <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" className="w-[100%] mt-6 object-cover object-top" />
                            {/* ):(
                                <FontAwesomeIcon icon={faImage}/>
                            )} */}
                        </div>
                        <div className="absolute inset-y-0 left-[8%] top-[50%] h-[70px] w-[70px] rounded-full overflow-hidden mr-1">
                            <img src="https://images.unsplash.com/photo-1639781436072-897a64a9bc42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyJTIwa2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='h-full w-full object-cover'/>
                        </div>
                        <div className="h-[50%] mt-10 ml-4">
                            <div className="flex w-full justify-between font-medium">
                            <p>Burger King</p>
                            <p>$30</p>
                            </div>
                            <div className="flex items-center ">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-1"/>
                                <p className="text-sm text-left mt-2">Kibagabaga KG43Str</p>
                            </div>
                            <RatingStars
                                count={5}
                                value={3}
                                onChange={()=>{return;}}
                                size={24}
                                activeColor="#003D29"
                            />
                            <div className="flex mt-2 justify-between items-center">
                            <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                            <div className="border-[1px] border-[#EA3A5B] rounded-[100%] shadow-md border-opacity-80">
                                <FontAwesomeIcon icon={faTrash} className="text-[#EA3A5B] px-2 py-1.5 opacity-80" />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6 my-10 md:mb-6">
                        <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden ">
                            {/* {product.image[0]?( */}
                                <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" className="w-[100%] mt-6 object-cover object-top" />
                            {/* ):(
                                <FontAwesomeIcon icon={faImage}/>
                            )} */}
                        </div>
                        <div className="absolute inset-y-0 left-[8%] top-[50%] h-[70px] w-[70px] rounded-full overflow-hidden mr-1">
                            <img src="https://images.unsplash.com/photo-1639781436072-897a64a9bc42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyJTIwa2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='h-full w-full object-cover'/>
                        </div>
                        <div className="h-[50%] mt-10 ml-4">
                            <div className="flex w-full justify-between font-medium">
                            <p>Burger King</p>
                            <p>$30</p>
                            </div>
                            <div className="flex items-center ">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-1"/>
                                <p className="text-sm text-left mt-2">Kibagabaga KG43Str</p>
                            </div>
                            <RatingStars
                                count={5}
                                value={3}
                                onChange={()=>{return;}}
                                size={24}
                                activeColor="#003D29"
                            />
                            <div className="flex mt-2 justify-between items-center">
                            <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                            <div className="border-[1px] border-[#EA3A5B] rounded-[100%] shadow-md border-opacity-80">
                                <FontAwesomeIcon icon={faTrash} className="text-[#EA3A5B] px-2 py-1.5 opacity-80" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;