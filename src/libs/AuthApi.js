import axios from 'axios';
import qs from 'qs';

// 授权API
export default class{

    constructor(options){
        this.ajax = axios.create(options)
    }
}