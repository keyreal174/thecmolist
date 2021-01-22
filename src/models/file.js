import axios from "axios";

const getimageUploadUrlRequest = (fileName, fileType) => {
  return axios.get(
    `/api/image_upload_url?fileName=${fileName}&fileType=${fileType}&displayWidth=200`
  );
};

const uploadImageRequest = (file, url) => {
  return axios.put(url, file, { headers: { "Content-Type": file.type } });
};

export default {
  name: "fileModel",
  state: {
    file: null,
  },
  reducers: {
    updateFile: (oldState, data) => {
      return {
        ...oldState,
        file: data,
      };
    },
  },
  effects: (dispatch) => ({}),
};
