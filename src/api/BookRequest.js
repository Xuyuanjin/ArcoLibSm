import axios from "axios";
import {bUrl} from "@/api/BaseUrl";
////查询全部用户信息
export function LoadBooks(){
    let request = axios({
        url:bUrl()+"/book",
        method:"get",
    })
    return request;
}