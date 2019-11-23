import Cookies from 'js-cookie'






export function set(key, value) {
  return Cookies.set(key, value);
}
export function get(key) {
  return Cookies.get(key);
}

export function remove(key) {
  return Cookies.remove(key);
}

//得到用户信息
export function getUfo() {
  let user = get("user");
    return user ?  JSON.parse(user) : {};

} 
//删除用户信息
export function removeUser() {
  return  remove("user")
}