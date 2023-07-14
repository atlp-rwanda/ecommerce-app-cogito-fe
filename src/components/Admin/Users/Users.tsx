import UsersTable from './UsersTable';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { RootState } from '../../../redux/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/action/FetchUsersAction';
import { changeAccountStatus } from '../../../redux/action/AccountStatusAction';
import { useNavigate } from 'react-router-dom';
import { fetchRoles } from '../../../redux/action/FetchRolesAction';
import { changeRole } from '../../../redux/action/ChangeRoleAction';
const Users = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.users);
  const { roles } = useSelector((state: RootState) => state.roles);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
    const roleId = localStorage.getItem('roleId');
    if (roleId) {
      if (parseInt(roleId) != 1) {
        navigate('/');
      }
    }
  }, []);
  const handleAccountStatus = (status: string, userId: number) => {
    dispatch(changeAccountStatus({ status, userId })).then(({ payload }: any) => {
      const { status } = payload;
      if (status === 200) {
        dispatch(fetchUsers());
      }
    });
  };
  const handleChangeRole = (roleId: number, userId: number) => {
    dispatch(changeRole({ roleId, userId })).then(({ payload }: any) => {
      const { statusCode } = payload;
      if (statusCode === 201) {
        dispatch(fetchUsers());
      }
    });
  };
  return (
    <div className="h-screen">
      <h2 className="text-green-900 text-xl font-semibold pt-4">Manage Users</h2>
      {isLoading ? '' : <UsersTable handleChangeStatus={handleAccountStatus} changeRole={handleChangeRole} roles={roles} users={isLoading ? [] : data} />}
    </div>
  );
};

export default Users;
