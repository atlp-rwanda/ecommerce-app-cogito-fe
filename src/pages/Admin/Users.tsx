import SideBar from '../../components/Admin/SideBar/SideBar';
import ManageUsers from '../../components/Admin/Users/Users';
const Users = () => {
  return (
    <div className="h-screen">
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideBar />
        </div>

        <div className="w-5/6 pl-10 bg-slate-100">
          <ManageUsers />
        </div>
      </div>
    </div>
  );
};

export default Users;
