
import { getUfo } from "@/untils/auth";
import Routerobj from "../untils/importRout.js"
function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}


export function filerRouter(arr) {
  return recursionRouter(arr);
}

function recursionRouter(allRouter = []) {
  var realRoutes = [];
  let rank = getUfo().rank
  allRouter.forEach((v, i) => {
    if (v.meta.rank.indexOf(rank) != -1) {
      if (v.children && v.children.length > 0) {
        v.children = recursionRouter(v.children);
      }
      realRoutes.push(v);
    }
  });
  return realRoutes;
}

export function filterRouterTable(RouterTable) {
  var newRouterTable = [];
  RouterTable.forEach((v, i) => {
    v.component = Routerobj[v.component];
    if (v.children && v.children.length > 0) {
      v.children = filterRouterTable(v.children);
    }
    newRouterTable.push(v);
  });
  return newRouterTable;
}