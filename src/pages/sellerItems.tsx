// CollectionSummary.tsx
import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { Link } from 'react-router-dom';
import { getCollection } from '../redux/action/sellerDah';
import { RootState } from '../redux/store/store';
import { CollectionItem } from '../type/types';

const CollectionSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const collection: CollectionItem[] = useSelector((state: RootState) => state.collection);

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  if (collection.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {collection.map((item) => (
        <div key={item.id}>
          <h3>
            <Link to={`/items/${item.id}`}>{item.name}</Link>
          </h3>
          {/* Render other summary details */}
        </div>
      ))}
    </div>
  );
};

export default CollectionSummary;
