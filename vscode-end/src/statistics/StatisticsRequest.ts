import { RequestMethod } from "../global";
var request = require('request');

export class StatisticsRequest{

    url: string;
    dataJson: Object;
    method: RequestMethod;

    constructor(url: string, dataJson: Object, method: RequestMethod){
        this.url = url;
        this.method = method;
        this.dataJson = dataJson;
    }

    run(responseCallback){
        request({
            url: this.url,
            method: this.method,
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: this.dataJson
        }, function (error, response, body) {
            responseCallback(error, response, body);
        });
    }

}