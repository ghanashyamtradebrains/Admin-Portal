"use client";
import {
  deleAffiliatePromotionImage,
  getAffiliatePromotionImage,
  postAffiliatePromotionImage,
} from "@/api/fetchClient";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./promotions.module.css";

function AdminAffiliatePromotion() {
  const [UploadImages, setUploadImages] = useState();
  const [images, setImages] = useState([]);
  useEffect(() => {
    getAffiliatePromotionImage().then((res) => {
      setImages(res?.data);
    });
  }, []);
  const fileList = [];
  let fileList1 = [];

  const updateList = () => {
    getAffiliatePromotionImage().then((res) => {
      setImages(res?.data);
      fileList1 = [];
    });
    {
      images?.map((Res) => {
        fileList.push({
          uid: Res?.id,
          name: Res?.name,
          status: "done",
          url: Res?.image,
          thumbUrl: Res?.image,
        });
      });
    }
  };

  {
    images?.map((Res) => {
      fileList.push({
        uid: Res?.id,
        name: Res?.name,
        status: "done",
        url: Res?.image,
        thumbUrl: Res?.image,
      });
    });
  }

  const uploadimg = async () => {
    const data = new FormData();
    data.append("image", UploadImages);
    data.append("image_size", UploadImages?.size);
    data.append("image_dimession", "100 * 100");
    postAffiliatePromotionImage(data).then((Res) => {
      updateList();

      fileList.push({
        uid: "1212",
        name: "zzz2.png",
        status: "done",
        url: Res?.data?.image,
        thumbUrl: Res?.data?.image,
      });
    });
  };

  const deleteImage = (id) => {
    deleAffiliatePromotionImage(id).then((res) => {
      updateList();
    });
  };

  return (
    <div className="w-100 my-body  px-30-0">
      <div className="d-flex justify-content-between w-100">
        <div>
          <p className="fs-s-20 fw-500">Image Upload</p>
          <p>
            Select Images to be uploaded on the promotions page for affliates
          </p>
        </div>
        <div></div>
      </div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        beforeUpload={() => false}
        onChange={(e) => {
          setUploadImages(e.file);
        }}
        className="darkmode-antdUploader"
      >
        <div className={styles.uploadContainer}>
          <button className={styles.uploadButton} icon={<UploadOutlined />}>
            Upload Image
          </button>

          <button
            className={styles.uploadButton}
            onClick={(e) => {
              e.stopPropagation();
              uploadimg();
            }}
          >
            Save Uploaded Images{" "}
          </button>
        </div>
      </Upload>
      <br />

      <br />
      <Upload
        listType="picture"
        fileList={fileList}
        directory={true}
        className="darkmode-antdUploader"
        onRemove={(e) => deleteImage(e?.uid)}
        defaultFileList={[...fileList]}
      ></Upload>
    </div>
  );
}

export default AdminAffiliatePromotion;
