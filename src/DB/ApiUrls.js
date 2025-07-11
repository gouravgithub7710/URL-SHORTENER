import supabase from "./supabase";
//import {supabaseUrl} from "./supabase";
import {supabaseUrl, BASE_URL} from "./supabase";

export async function getUrls(user_id) {
   const {data, error} = await supabase
   .from("urls")
   .select('*')
   .eq('user_id', user_id);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to load URLs');};
  return data;
} 

export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
  console.log("=== CREATE URL DEBUG ===");
  console.log("Input data:", {title, longUrl, customUrl, user_id});
  console.log("QR code:", qrcode);
  
  const short_url = Math.random().toString(36).substr(2, 6);
  const fileName = `qr-${short_url}`;
  console.log("Generated short_url:", short_url);

  const {error: storageError} = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) {
    console.error("Storage Error:", storageError);
    throw new Error(storageError.message);
  }
  console.log("QR upload successful");

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const insertData = {
    title,
    user_id,
    original_url: longUrl,
    custom_url: customUrl || null,
    short_url,
    qr,
  };
  
  console.log("Inserting data:", insertData);

  const {data, error} = await supabase
    .from("urls")
    .insert([insertData])
    .select();

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Error creating short URL: " + error.message);
  }

  console.log("Success! Inserted data:", data);
  return data;
}

export async function deleteUrl(id) {
  const {data, error} = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete Url");
  }

  return data;
}

export async function getLongUrl(id) {
  let {data, error} = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .maybeSingle(); // CHANGED: .single() to .maybeSingle()
     
  if (error) {
    console.error("Error fetching short link:", error);
    return null;
  }

  return data;
}

export async function getUrl({id, user_id}) {
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .maybeSingle(); // CHANGED: .single() to .maybeSingle()
    
  if (error) {
    console.error("Error fetching URL:", error);
    throw new Error("Short Url not found");
  }

  return data;
}

// Test function to debug database issues
export async function testDatabaseConnection() {
  console.log("Testing database connection...");
  
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .limit(1);
    
  if (error) {
    console.error("Database connection error:", error);
  } else {
    console.log("Database connection successful:", data);
  }
  
  return {data, error};
}




// import supabase from "./supabase";
// //import {supabaseUrl} from "./supabase";
// import {supabaseUrl, BASE_URL} from "./supabase";

// export async function getUrls(user_id) {
//    const {data, error} = await supabase
//    .from("urls")
//    .select('*')
//    .eq('user_id', user_id);

//   if (error) {
//     console.error(error.message);
//     throw new Error('Unable to load URLs');};
//   return data;
// } 

// export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
//   const short_url = Math.random().toString(36).substr(2, 6);
//   const fileName = `qr-${short_url}`;

//   const {error: storageError} = await supabase.storage
//     .from("qrs")
//     .upload(fileName, qrcode);

//   if (storageError) throw new Error(storageError.message);

//   const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

//   const {data, error} = await supabase
//     .from("urls")
//     .insert([
//       {
//         title,
//         user_id,
//         original_url: longUrl,
//         custom_url: customUrl || null,
//         short_url,
//         qr,
//       },
//     ])
//     .select();
   

//   if (error) {
//     console.error(error);
//     throw new Error("Error creating short URL");
//   }

//   return data;
// }


// export async function deleteUrl(id) {
//   const {data, error} = await supabase.from("urls").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Unable to delete Url");
//   }

//   return data;
// }


// export async function getLongUrl(id) {
//   let {data, error} = await supabase
//     .from("urls")
//     .select("id, original_url")
//     .or(`short_url.eq.${id},custom_url.eq.${id}`)
//     .single();
//     //.maybeSingle();
     

//   if (error) {
//     console.error("Error fetching short link:");
//     return;
//   }

//   return data;
// }

// export async function getUrl({id, user_id}) {
//   const {data, error} = await supabase
//     .from("urls")
//     .select("*")
//     .eq("id", id)
//     .eq("user_id", user_id)
//     .single();
//     //.maybeSingle();
    

//   if (error) {
//     console.error(error);
//     throw new Error("Short Url not found");
//   }

//   return data;
// }


