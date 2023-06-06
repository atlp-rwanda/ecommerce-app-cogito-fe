import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIndexMessage } from "../redux/action/IndexAction";
import { IndexState } from "../redux/store";

function InitialMessage() {
    const indexData = useSelector((state: IndexState) => state.index.data)
    const indexStatus = useSelector((state: IndexState) => state.index.status)
    const indexLoading = useSelector((state: IndexState) => state.index.loading)
    const indexError = useSelector((state: IndexState) => state.index.error)  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndexMessage()as any);
  }, [dispatch]);

  if (indexLoading) {
    return <h2>Loading...</h2>;
  }
else if (indexError) {
    return <h2>{indexError}</h2>;
  }
else{
    return (
    <>
    <h2>
        {indexData}<br></br>Status: {indexStatus}</h2>
    </>
    );
  }
 
}

export default InitialMessage;