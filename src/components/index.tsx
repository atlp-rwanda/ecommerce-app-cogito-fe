import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks/hooks';
import { fetchIndexMessage } from '../redux/action/IndexAction';
import { RootState } from '../redux/store/store';

function InitialMessage() {
  const indexData = useSelector((state: RootState) => state.index.data);
  const indexStatus = useSelector((state: RootState) => state.index.status);
  const indexLoading = useSelector((state: RootState) => state.index.loading);
  const indexError = useSelector((state: RootState) => state.index.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIndexMessage() as any);
  }, [dispatch]);

  if (indexLoading) {
    return <h2>Loading...</h2>;
  } else if (indexError) {
    return <h2>{indexError}</h2>;
  } else {
    return (
      <>
        <h2>
          {indexData}
          <br />Status: {indexStatus}
        </h2>
      </>
    );
  }
}

export default InitialMessage;
