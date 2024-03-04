import { MinusCircleOutlined } from "@ant-design/icons";

import { Divider, Input, Space, Tag, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { CheckableTag } = Tag;
const categoryData = ["FE", "Git", "Github", "ReactJS", "VueX", "VueJs"];
const TagsData = ["FE", "Git", "Github", "ReactJS"];

function CreatePost() {
  //Tag ant design
  const [selectedCategorys, setSelectedCategorys] = useState([""]);
  const handleChangeCategory = (category, checked) => {
    const nextSelectedCategorys = checked
      ? [...selectedCategorys, category]
      : selectedCategorys.filter((t) => t !== category);
    console.log("You are interested in: ", nextSelectedCategorys);
    setSelectedCategorys(nextSelectedCategorys);
  };
  const [selectedTags, setSelectedTags] = useState([""]);
  const handleChangeTag = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  //  Editor
  const [value, setValue] = useState("");
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"][("bold", "italic")],
    ["link", "image"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "http://wp-api.test:8080/wp-content/uploads/2023/12/avt-con-meo-cute.jpg",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="create-post">
      <h3 className="create-post-title">Tiêu đề</h3>
      <Input placeholder="Tiêu đề bài viết" />

      <h3 className="create-post-title">Danh mục bài viết</h3>
      <div className="">
        <Divider orientation="left">Category</Divider>
        <Space size={[0, 8]} wrap>
          {/* <Tag icon={<CheckCircleOutlined />} color="success">
            react
          </Tag> */}
          <Tag icon={<MinusCircleOutlined />} color="default">
            vuex
          </Tag>
          <Tag icon={<MinusCircleOutlined />} color="default">
            vuex
          </Tag>
        </Space>
        <Divider orientation="left">Tags</Divider>
        <Space size={[0, 8]} wrap>
          {/* <Tag icon={<CheckCircleOutlined />} color="success">
            fe
          </Tag> */}
          <Tag icon={<MinusCircleOutlined />} color="default">
            git
          </Tag>
          <Tag icon={<MinusCircleOutlined />} color="default">
            vuex
          </Tag>
        </Space>
      </div>

      <h3 className="create-post-title">Nội dung bài viết</h3>
      <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />

      <h3 className="create-post-title">Ảnh bài viết</h3>
      <ImgCrop rotationSlider>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>

      <div className="btn-create-post">
        <button>Tạo bài viết</button>
      </div>
    </div>
  );
}

export default CreatePost;
