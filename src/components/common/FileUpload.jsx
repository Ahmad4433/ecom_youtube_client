import React, { useRef, useState } from "react";
import "./fileUpload.css";
import { IoMdCloudUpload } from "react-icons/io";
import httpAction from "../../utils/httpAction";
import apis from "../../utils/apis";
import useProvideHooks from "../../hooks/useProvideHooks";

const FileUpload = () => {
  const { dispatch, loading, setLoading } = useProvideHooks();
  const fileRef = useRef();
  const [files, setFiles] = useState([]);
  const fileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const fileChnage = async (event) => {
    const formatedArray = Array.from(event.target.files);

    for (let img of formatedArray) {
      await upload(img);
    }
  };

  async function upload(image) {
    const formData = new FormData();

    formData.append("image", image);

    const data = {
      url: apis().imageUpload,
      method: "POST",
      formData: formData,
    };

    const result = await dispatch(httpAction(data));

    if (result?.status) {
      setFiles((prevFile) => [...prevFile, result?.image]);
    }
  }

  return (
    <div className="file_upload_main">
      <div onClick={fileClick} className="file_upload_section">
        <input
          ref={fileRef}
          type="file"
          onChange={fileChnage}
          accept="image/png,image/jpeg,image/jpg"
          multiple
          style={{ display: "none" }}
        />
        <IoMdCloudUpload />
        <span>Upload Images</span>
      </div>
      <div className="file_previews">
        {files.map((item, index) => {
          return (
            <div className="single_preview">
              <img src={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;