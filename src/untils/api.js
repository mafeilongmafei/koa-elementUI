import axios from "./request";

// export function getInfo(nickname, password) {
//   return axios.post("/app/mock/230901/login", {
//     nickname,
//     password
//   });
// }

export function getUserInfo(nickname, password) {
  return axios.post("/v1/user/login", {
    nickname,
    password
  });
}


export function getRouterTable() {
  return axios.get("/v1/user/router");
}

export function getShop(){
  return axios.get("/shopInfo");
}

export function getEchData() {
  return axios.get("/eachart");
}

export function getAdminList(pageSize = 1) {
  return axios.post("/v1/user/admin/list" , { pageSize });
  
}

export function addAmin(data ) {
  let config = {
    header : {"Content-type" : "multipart/form-data"}
  }
  return axios.post("/v1/user/addAdmin" ,data , config );
}

export function deleteAmin(id) {
  return axios.post("/v1/user/adminDelete", { id });
}
export function settingAdmin(data) {
   let config = {
     header: { "Content-type": "multipart/form-data" }
   };
  return axios.post("/v1/user/adminSetting" , data , config);
}

export function  getMessageList(id ) {
  return axios.get(`/v1/UserMessage?id=${id}`);
  
}

export function settigMsgStatus(data) {
  return axios.post("/v1/changStatus" , data);
}
export function getUndoneMsg() {
  return axios.get("/v1/undone");
  
}