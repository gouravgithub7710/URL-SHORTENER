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

  // useEffect(() => {
  //   if (!loading && data) {
  //     fnStats();
  //     //add new
  //     window.location.href = data.original_url;
  //   }
  // }, [loading]);

  // useEffect(() => {
  //   if (!loading && data) {
  //     console.log("📦 storeClicks called for:", data.id);
  //     storeClicks({
  //       id: data.id,
  //       originalUrl: data.original_url,
  //     });
  //   }
  // }, [loading, data]);

    useEffect(() => {
    if (!loading && data?.id) {
      console.log("📦 storeClicks called for:", data.id);
      console.log("📦 Original URL:", data.original_url);
      // ✅ Async function to store click and then redirect
      const logClickAndRedirect = async () => {
        try {
          // ✅ Call the fixed storeClicks function
          await storeClicks({
            id: data.id,
            originalUrl: data.original_url,
          });
          
          console.log("✅ Click successfully stored!");
          
          // ✅ Add small delay to ensure data is saved
          setTimeout(() => {
            window.location.href = data.original_url;
          }, 500);
          
        } catch (error) {
          console.error("❌ Error storing click:", error);
          // ✅ Still redirect even if click tracking fails
          window.location.href = data.original_url;
        }
      };

      logClickAndRedirect();
    }
  }, [loading, data]);

  if (loading) {
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





// import React from 'react'
// import useFetch from '../components/Hooks/use-fetch';
// import { storeClicks } from '../DB/ApiClicks';
// import { useParams } from 'react-router-dom';
// import { getLongUrl } from '../DB/ApiUrls';
// import { useEffect } from 'react';
// import BarLoader from 'react-spinners/BarLoader';

// const RedirectLink = () => {
//   const {id} = useParams();
//   const {loading, data, fn} = useFetch(getLongUrl, id);

//   useEffect(() => {
//     fn();
//   }, []);

//   useEffect(() => {
//     if (!loading && data?.id) {
//       console.log("📦 storeClicks called for:", data.id);
//       console.log("📦 Original URL:", data.original_url);
      
//       // ✅ Async function to store click and then redirect
//       const logClickAndRedirect = async () => {
//         try {
//           console.log("🔄 Starting click storage process...");
          
//           // ✅ Call the storeClicks function and wait for completion
//           const result = await storeClicks({
//             id: data.id,
//             originalUrl: data.original_url,
//           });
          
//           console.log("✅ Click successfully stored!", result);
          
//           // ✅ Redirect after successful storage
//           window.location.href = data.original_url;
          
//         } catch (error) {
//           console.error("❌ Error storing click:", error);
//           console.error("❌ Error details:", error.message);
          
//           // ✅ Still redirect even if click tracking fails
//           // User experience shouldn't be affected
//           window.location.href = data.original_url;
//         }
//       };

//       logClickAndRedirect();
//     }
//   }, [loading, data]);

//   if (loading) {
//     return (
//       <>
//         <BarLoader width={"100%"} color="#36d7b7" />
//         <br />
//         Redirecting...
//       </>
//     );
//   }

//   return null;
// };

// export default RedirectLink