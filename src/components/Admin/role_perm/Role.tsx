const Role = ({ roles, selectRole, activeRole }: any) => {
  const selectedRole = (role: number) => {
    selectRole(role);
  };
  return (
    <div className="bg-white w-1/4 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2 py-2 border-slate-300 border-b">Role</h2>
      <ul>
        {roles.map((role: any, index: number) => (
          <li key={index} className={'py-3 pl-4 hover:bg-slate-100 rounded' + (role.roleName === activeRole ? ' bg-slate-100' : '')} onClick={() => selectedRole(role.roleName)}>
            {role.roleName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Role;
