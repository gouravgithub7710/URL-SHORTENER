import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Error from "@/components/Error";
import * as yup from "yup";
import useFetch from "@/components/Hooks/use-fetch";
import {createUrl} from "@/DB/ApiUrls";
import {BeatLoader} from "react-spinners";
//import {UrlState} from "@/context";
import {UrlState} from "../../Context";
import {QRCode} from "react-qrcode-logo";
import { BASE_URL } from '../../DB/supabase'

//import { error } from "console";
 

const CreateLink = () => {

   const {user} = UrlState();

  const navigate = useNavigate();
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

    const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {...formValues, user_id: user.id});

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, {abortEarly: false});

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      //await fnCreateUrl(blob);
      await fnCreateUrl({ ...formValues, user_id: user.id }, blob);

    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };


  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          <DialogDescription>
    Create a new short link for your URL
  </DialogDescription>
        </DialogHeader>
        {formValues?.longUrl && (
          <QRCode ref={ref} size={250} value={formValues?.longUrl} />
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your Loooong URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2">url-shortener-gourav.vercel.app</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        {errors && <Error message={errors.message} />}
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateLink

// import {Button} from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import {Input} from "@/components/ui/input";
// import {Card} from "@/components/ui/card";
// import {useNavigate, useSearchParams} from "react-router-dom";
// import {useEffect, useRef, useState} from "react";
// import Error from "@/components/Error";
// import * as yup from "yup";
// import useFetch from "@/components/Hooks/use-fetch";
// import {createUrl} from "@/DB/ApiUrls";
// import {BeatLoader} from "react-spinners";
// //import {UrlState} from "@/context";
// import {UrlState} from "../../Context";
// import {QRCode} from "react-qrcode-logo";
// import { BASE_URL } from '../../DB/supabase'

// //import { error } from "console";
 

// const CreateLink = () => {

//    const {user} = UrlState();

//   const navigate = useNavigate();
//   const ref = useRef();

//   let [searchParams, setSearchParams] = useSearchParams();
//   const longLink = searchParams.get("createNew");

//   const [errors, setErrors] = useState({});
//   const [formValues, setFormValues] = useState({
//     title: "",
//     longUrl: longLink ? longLink : "",
//     customUrl: "",
//   });

//     const schema = yup.object().shape({
//     title: yup.string().required("Title is required"),
//     longUrl: yup
//       .string()
//       .url("Must be a valid URL")
//       .required("Long URL is required"),
//     customUrl: yup.string(),
//   });

//   const handleChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const {
//     loading,
//     error,
//     data,
//     fn: fnCreateUrl,
//   } = useFetch(createUrl, {...formValues, user_id: user.id});

//   useEffect(() => {
//     if (error === null && data) {
//       navigate(`/link/${data[0].id}`);
//     }
//   }, [error, data]);

//   const createNewLink = async () => {
//     setErrors([]);
//     try {
//       await schema.validate(formValues, {abortEarly: false});

//       const canvas = ref.current.canvasRef.current;
//       const blob = await new Promise((resolve) => canvas.toBlob(resolve));

//       //await fnCreateUrl(blob);
//       await fnCreateUrl({ ...formValues, user_id: user.id }, blob);

//     } catch (e) {
//       const newErrors = {};

//       e?.inner?.forEach((err) => {
//         newErrors[err.path] = err.message;
//       });

//       setErrors(newErrors);
//     }
//   };

//   // ✅ NEW FUNCTION: Get domain from BASE_URL instead of hardcoding
//   // This will show correct domain in both local and production
//   const getDomain = () => {
//     return BASE_URL.replace('https://', '').replace('http://', '');
//   };

//   return (
//     <Dialog
//       defaultOpen={longLink}
//       onOpenChange={(res) => {
//         if (!res) setSearchParams({});
//       }}
//     >
//       <DialogTrigger asChild>
//         <Button variant="destructive">Create New Link</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
//           <DialogDescription>
//     Create a new short link for your URL
//   </DialogDescription>
//         </DialogHeader>
//         {formValues?.longUrl && (
//           <QRCode ref={ref} size={250} value={formValues?.longUrl} />
//         )}

//         <Input
//           id="title"
//           placeholder="Short Link's Title"
//           value={formValues.title}
//           onChange={handleChange}
//         />
//         {errors.title && <Error message={errors.title} />}
//         <Input
//           id="longUrl"
//           placeholder="Enter your Loooong URL"
//           value={formValues.longUrl}
//           onChange={handleChange}
//         />
//         {errors.longUrl && <Error message={errors.longUrl} />}
//         <div className="flex items-center gap-2">
//           {/* ✅ CHANGED: Dynamic domain instead of hardcoded "url-shortener-gourav.vercel.app" */}
//           <Card className="p-2">{getDomain()}</Card> /
//           <Input
//             id="customUrl"
//             placeholder="Custom Link (optional)"
//             value={formValues.customUrl}
//             onChange={handleChange}
//           />
//         </div>
//         {errors && <Error message={errors.message} />}
//         <DialogFooter className="sm:justify-start">
//           <Button
//             type="button"
//             variant="destructive"
//             onClick={createNewLink}
//             disabled={loading}
//           >
//             {loading ? <BeatLoader size={10} color="white" /> : "Create"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CreateLink