export default function Table() {
    return (
      <div className="relative mt-10 mb-6 shadow-lg w-full sm:w-[90%]">
        <p className="font-medium mb-2 inline-block">Recent Products</p>
        <div className="w-full pb-2 overflow-x-auto">
          <table className="font-light w-full">
            <thead className="bg-blue-200">
              <tr>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">Name</th>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">#Id</th>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">Products</th>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">Category</th>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">Description</th>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">Amount</th>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">Date</th>
                <th className="w-[20%] sm:w-32 text-start font-light px-6 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">Iphone13</td>
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">Iphone13</td>
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">Iphone13</td>
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">Iphone13</td>
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">Iphone13</td>
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">Iphone13</td>
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">Iphone13</td>
                <td className="w-[20%] sm:w-32 text-start px-6 py-1">
                  <div className="symbols flex justify-between">
                    <i className="material-symbols-rounded text-blue-500">visibility</i>
                    <i className="update material-symbols-rounded text-orange-500">edit</i>
                    <i className="material-symbols-rounded text-red-500">delete</i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }