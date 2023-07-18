import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
export default function Table({ roles, users, handleChangeStatus, changeRole }: any) {
  const [buttonStates, setButtonStates] = useState(Array(users.length).fill(false));
  const [userIdRole, setUserIdRole] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLTableSectionElement>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchResult, setSearch] = useState([]);
  const [searchTextValue, setTextSearch] = useState('');
  const [offset, setOffSet] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const perPage = 10;
  const openModal = (userId: number) => {
    setIsOpen(true);
    setUserIdRole(userId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setUserIdRole(0);
  };

  useEffect(() => {
    setPageCount(Math.ceil(users.length / perPage));
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = (index: number) => {
    if (index != 0) {
      setButtonStates(Array(users.length).fill(false));
      console.log('changed');
    }
    const updatedStates = [...buttonStates];
    updatedStates[index] = !updatedStates[index];
    setButtonStates(updatedStates);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setButtonStates(Array(users.length).fill(false));
    }
  };

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setOffSet(offset);
  };

  const handleSearch = (event: any) => {
    const searchText = event.target.value;
    setTextSearch(searchText);
    if (searchText === '') {
      setSearch([]);
    } else {
      setSearch(
        users.filter(
          (result: any) => result.name.toLowerCase().includes(searchText.toLowerCase()) || result.email.toLowerCase().includes(searchText.toLowerCase()) || result.phone.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    console.log(searchResult);
  };
  const handleAccount = (status: string, id: number) => {
    handleChangeStatus(status, id);
  };
  const handleChangeRole = () => {
    if (selectedOption != '0' && userIdRole != 0) {
      changeRole(selectedOption, userIdRole);
    }
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className=" mt-10  w-full sm:w-[90%] h-screen">
      <div className="flex justify-between items-center mb-3">
        <p className="font-medium mb-3 inline-block">List of users</p>
        <input type="text" onChange={(event) => handleSearch(event)} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search user" />
      </div>

      <div className="w-full pb-2 overflow-x-auto bg-white">
        <table className="font-light w-full">
          <thead className="bg-blue-200">
            <tr>
              <th className="w-[10%] sm:w-10 text-start font-semibold px-6 py-4">#</th>
              <th className="w-[40%] sm:w-32 text-start font-semibold px-6 py-4">Name</th>
              <th className="w-[20%] sm:w-32 text-start font-semibold px-6 py-4">Email</th>
              <th className="w-[20%] sm:w-32 text-start font-semibold px-6 py-4">phone</th>
              <th className="w-[20%] sm:w-32 text-start font-semibold px-6 py-4">Role</th>
              <th className="w-[20%] sm:w-32 text-start font-semibold px-6 py-4">Status</th>
              <th className="w-[20%] sm:w-32 text-start font-semibold px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody ref={buttonRef}>
            {searchResult.length > 0 || searchTextValue != ''
              ? searchResult.map((user: any, index: number) => (
                  <tr key={index} className="">
                    <td className="w-[10%] sm:w-10 text-start px-6 py-3">{index + 1}</td>
                    <td className="w-[40%] sm:w-64 text-start px-6 py-3">{user.name}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">{user.email}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">{user.phone}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">{user.role.roleName}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">
                      {user.status === 'active' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">{user.status}</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">{user.status}</span>
                      )}
                    </td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">
                      <div className="">
                        <button onClick={() => handleClick(index)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
                          Action
                        </button>
                        <div className={'absolute bg-white rounded-md shadow-md z-1 ' + (buttonStates[index] ? '' : 'hidden')}>
                          <ul className="py-2">
                            <li onClick={() => openModal(user.id)}>
                              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Change Role
                              </a>
                            </li>

                            {user.status === 'active' ? (
                              <li onClick={handleAccount.bind(null, 'inactive', user.id)}>
                                <a href="#" className="block px-4 py-2 text-red-800 hover:bg-red-800 hover:text-white">
                                  Deactivate
                                </a>
                              </li>
                            ) : (
                              <li onClick={handleAccount.bind(null, 'active', user.id)}>
                                <a href="#" className="block px-4 py-2 text-green-800 hover:bg-green-800 hover:text-white">
                                  Activate
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : users.slice(offset, offset + perPage).map((user: any, index: number) => (
                  <tr key={index} className="">
                    <td className="w-[10%] sm:w-10 text-start px-6 py-3">{index + 1}</td>
                    <td className="w-[40%] sm:w-64 text-start px-6 py-3">{user.name}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">{user.email}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">{user.phone}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">{user.role.roleName}</td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">
                      {user.status === 'active' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">{user.status}</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">{user.status}</span>
                      )}
                    </td>
                    <td className="w-[20%] sm:w-32 text-start px-6 py-3">
                      <div className="">
                        <button onClick={() => handleClick(index)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
                          Action
                        </button>
                        <div className={'absolute bg-white rounded-md shadow-md z-1 ' + (buttonStates[index] ? '' : 'hidden')}>
                          <ul className="py-2">
                            <li onClick={() => openModal(user.id)}>
                              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Change Role
                              </a>
                            </li>

                            {user.status === 'active' ? (
                              <li onClick={handleAccount.bind(null, 'inactive', user.id)}>
                                <a href="#" className="block px-4 py-2 text-red-800 hover:bg-red-800 hover:text-white">
                                  Deactivate
                                </a>
                              </li>
                            ) : (
                              <li onClick={handleAccount.bind(null, 'active', user.id)}>
                                <a href="#" className="block px-4 py-2 text-green-800 hover:bg-green-800 hover:text-white">
                                  Activate
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 ">
        {searchResult.length > 0 || searchTextValue != '' ? (
          ''
        ) : (
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            previousClassName="border-solid border rounded border-green-800 px-4 py-1 text-green-800 hover:bg-green-800 hover:text-white mr-3"
            nextClassName="border-solid border rounded border-green-800 px-4 py-1 text-green-800 hover:bg-green-800 hover:text-white ml-3"
            breakLabel={'...'}
            breakLinkClassName="text-green-800"
            pageClassName="border-solid border border-green-800 rounded w-8 py-1 text-center text-green-800 mx-1 hover:bg-green-800 hover:text-white"
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-end items-center'}
            activeClassName={'bg-green-800 rounded w-8 py-1 text-center text-white'}
          />
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white w-1/3 rounded-lg shadow-lg">
            <div className="p-4">
              <h4 className="block text-md font-medium text-gray-700">Select new role:</h4>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="mt-5 block pl-3 pr-10 py-2 text-base w-full border-2 border-grey-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {roles.map((role: any, index: number) => (
                  <option key={index} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between p-4">
              <button className="bg-white-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" onClick={closeModal}>
                Close
              </button>
              <button onClick={handleChangeRole} className="bg-green-300 hover:bg-green-800 hover:text-white text-gray-800 py-2 px-4 rounded">
                Change Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
