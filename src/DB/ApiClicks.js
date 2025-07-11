// import { UAParser } from "ua-parser-js";
// import supabase from "./supabase";

// export async function getClicksForUrls(urlIds) {
//    const {data, error} = await supabase
//    .from("clicks")
//    .select('*')
//    .in('url_id', urlIds);

//   if (error) {
//     console.error(error.message);
//     throw new Error('Unable to load Clicks');};
//   return data;
// } 
// export async function getClicksForUrl(url_id) {
//   const {data, error} = await supabase
//     .from("clicks")
//     .select("*")
//     .eq("url_id", url_id);

//   if (error) {
//     console.error(error);
//     throw new Error("Unable to load Stats");
//   }

//   return data;
// }

// const parser = new UAParser();

// // export const storeClicks = async ({id, originalUrl}) => {
// //   try {
// //     const res = parser.getResult();
// //     const device = res.type || "desktop"; 

// //     const response = await fetch("https://ipapi.co/json");
// //     const {city, country_name: country} = await response.json();

    
// //     await supabase.from("clicks").insert({
// //       url_id: id,
// //       city: city,
// //       country: country,
// //       device: device,
// //     });

    
// //     window.location.href = originalUrl;
// //   } catch (error) {
// //     console.error("Error recording click:", error);
// //   }
// // };

// export const storeClicks = async ({id, originalUrl}) => {
//   try {
//     console.log("🟡 Logging from storeClicks → inserting click for url_id:", id);

//     const res = parser.getResult();
//     const device = res.type || "desktop";

//     const response = await fetch("https://ipapi.co/json");
//     const {city, country_name: country} = await response.json();

//     const { error } = await supabase.from("clicks").insert({
//       url_id: id,
//       city: city,
//       country: country,
//       device: device,
//     });

//     if (error) {
//       console.error("❌ Supabase insert error:", error);
//     } else {
//       console.log("✅ Click stored for url_id:", id);
//     }

//     window.location.href = originalUrl;
//   } catch (error) {
//     console.error("Error recording click:", error);
//   }
// };


// ApiClicks.js - Fixed Version

import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select('*')
    .in('url_id', urlIds);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to load Clicks');
  }
  return data;
} 

export async function getClicksForUrl(url_id) {
  console.log("🔍 Fetching clicks for URL ID:", url_id);
  
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error("❌ Error fetching clicks:", error);
    throw new Error("Unable to load Stats");
  }

  console.log("📊 Clicks data fetched:", data);
  return data;
}

const parser = new UAParser();

// ✅ FIXED: Better error handling and data validation
export const storeClicks = async ({id, originalUrl}) => {
  try {
    console.log("🟡 Starting click storage process...");
    console.log("🟡 URL ID:", id);
    console.log("🟡 Original URL:", originalUrl);

    // ✅ Validate input data
    if (!id) {
      throw new Error("URL ID is required");
    }

    // ✅ Get device info
    const res = parser.getResult();
    const device = res.type || "desktop";
    console.log("📱 Device detected:", device);

    // ✅ Get location info with better error handling
    let city = "Unknown";
    let country = "Unknown";
    
    try {
      const response = await fetch("https://ipapi.co/json");
      if (response.ok) {
        const locationData = await response.json();
        city = locationData.city || "Unknown";
        country = locationData.country_name || "Unknown";
      }
    } catch (locationError) {
      console.warn("⚠️ Location API failed, using defaults:", locationError);
    }

    console.log("🌍 Location:", city, country);

    // ✅ Insert into database
    const clickData = {
      url_id: id,
      city: city,
      country: country,
      device: device,
    };

    console.log("💾 Inserting click data:", clickData);

    const { data, error } = await supabase
      .from("clicks")
      .insert([clickData])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      throw error;
    }

    console.log("✅ Click stored successfully:", data);
    return data;

  } catch (error) {
    console.error("❌ Error in storeClicks:", error);
    throw error;
  }
};
