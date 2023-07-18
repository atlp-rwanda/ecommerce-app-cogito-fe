import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import Role from './Role';
import Permissions from './Permissions';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchPermissions } from '../../../redux/action/FetchPermissionsAction';
import { fetchRoles } from '../../../redux/action/FetchRolesAction';
import { fetchRolePermissions } from '../../../redux/action/FetchRolePermissionsAction';

const RolePerms = () => {
  const { roles } = useSelector((state: RootState) => state.roles);
  const { permissions } = useSelector((state: RootState) => state.permissions);
  const { rolesPermissions } = useSelector((state: RootState) => state.rolesPermissions);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPermissions());
    dispatch(fetchRoles());
    dispatch(fetchRolePermissions());
  }, []);
  const selectedUserRole = (role: string) => {
    console.log(role);
    setSelectedRole(role);
    setRolePermissions(rolesPermissions.filter((permission: any) => permission.role.roleName === role));
  };
  return (
    <div className="h-screen">
      <h2 className="text-green-900 text-xl font-semibold pt-4">Roles and Permissions</h2>
      <div className="flex mt-3">
        <Role roles={roles} selectRole={selectedUserRole} activeRole={selectedRole} />
        {selectedRole ? <Permissions rolePermissions={rolePermissions} permissions={permissions} role={selectedRole} /> : ''}
      </div>
    </div>
  );
};

export default RolePerms;
