import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { searchQuery, feedQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
      });
      setLoading(false);
    } else {
      client.fetch(feedQuery).then((data) => setPins(data));
      setLoading(false);
    }
  }, [categoryId]);
  if (loading)
    return <Spinner message='we are adding new ideas for your feed!' />;
  if (!pins?.length) return <h1>No pins available</h1>;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
