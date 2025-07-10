import React from 'react'
import useFetch from '../components/Hooks/use-fetch';
import { storeClicks } from '../DB/ApiClicks';

import { useParams } from 'react-router-dom';
import { getLongUrl } from '../DB/ApiUrls';
import { useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';


const RedirectLink = () => {
  const {id} = useParams();
    const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink
