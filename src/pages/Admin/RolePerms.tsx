import RolePermission from '../../components/Admin/role_perm/RolePerms';
import Sidebar from '../../components/Admin/SideBar/SideBar';
const RolePerms = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/6">
          <Sidebar />
        </div>

        <div className="w-5/6 pl-10 bg-slate-100 ">
          <RolePermission />
        </div>
      </div>
    </div>
  );
};

export default RolePerms;
