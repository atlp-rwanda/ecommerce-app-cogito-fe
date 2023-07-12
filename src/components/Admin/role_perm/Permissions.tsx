const Permissions = ({ permissions, role, rolePermissions }: any) => {
  return (
    <div className="bg-white w-3/4 rounded-lg shadow-md ml-2 p-4">
      <h2 className="text-xl font-semibold mb-2 py-2 border-slate-300 border-b">{role}'s permissions</h2>
      <ul className="pt-4">
        {permissions.length > 0
          ? permissions.map((permission: any, index: number) => (
              <div key={index} className="mb-3">
                {rolePermissions[index] ? (
                  rolePermissions[index].permissionId === permission.id ? (
                    <>
                      <input type="checkbox" className="mr-2 checked:bg-green-500" checked={true} />
                      <label htmlFor="">{permission.permissionName}</label>
                    </>
                  ) : (
                    <>
                      <input type="checkbox" className="mr-2 checked:bg-green-500" checked={false} />
                      <label htmlFor="">{permission.permissionName}</label>
                    </>
                  )
                ) : (
                  <>
                    <input type="checkbox" className="mr-2 checked:bg-green-500" checked={false} />
                    <label htmlFor="">{permission.permissionName}</label>
                  </>
                )}
              </div>
            ))
          : 'No permissions'}
      </ul>
    </div>
  );
};

export default Permissions;
