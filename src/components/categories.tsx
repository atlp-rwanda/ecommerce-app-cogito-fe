import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks/hooks';
import { useEffect } from 'react';
import { getCategories } from '../redux/action/categoryAction';
import { RootState } from '../redux/store/store';
import { useSelector } from 'react-redux';
import { faArrowAltCircleRight, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Categories = () => {
  const dispatch = useAppDispatch();
  interface CategoryData {
    id: number;
    name: string;
    image: string;
  }
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const categories = useSelector((state: RootState) => state.category.value);

  let renderedCategories;
  if (!categories) {
    renderedCategories = <p>Loading...</p>;
  } else if (categories.length === 0) {
    renderedCategories = <p>No Categories Found.</p>;
  } else {
    renderedCategories = categories.slice(0, 9).map((category: CategoryData) => (
      <Link to={`/products/category/${category.id}`}>
      <div className="lg:h-[50vh] ll:h-[50vh] h-[40vh] w-full " key={category.id}>
        <div className="bg-[#F5F6F6] h-[80%] w-full rounded-lg flex items-center justify-center overflow-hidden hover:bg-green-700">
          {category.image ? <img src={category.image} alt="" className="w-full h-full mt-6 object-cover object-top hover:w-screen" /> : <FontAwesomeIcon icon={faImage} />}
        </div>
        <div className="h-[10%] mt-1">
            <div className="flex w-full justify-between font-medium px-5">
              <p className="hover:text-green-700">{category.name}</p>
              <div className="">
                <FontAwesomeIcon icon={faArrowAltCircleRight} className="text-[#003D29] text-3xl hover:text-green-900 hover:text-4xl" />
              </div>
            </div>       
        </div>
      </div>
      </Link>
    ));
  }
  return (
    <>
      <div className="mx-8 my-8 p-5">
        <p className="font-bold text-xl py-10">Shop Our Top Categories</p>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 lg:px-5 px-0 pt-5 pb-0 lg:grid-cols-3">{renderedCategories}</div>
      </div>
    </>
  );
};

export default Categories;
