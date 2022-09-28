/*
 * Filename            :       ActivationStatistics.ts
 * Author              :       Erik Chan
 * Data                :       2021-12-15
 * Version             :       0.1
 * Description         :       信息统计
 * Change Logs:
 * Date           Author       Notes
 * 2021/12/15    Erik Chan     添加启动统计和系统信息统计
 */

import { getRemainTime, getTimestamp } from '../utils/DateUtil';
import * as vscode from 'vscode';
import fs = require('fs');
import { StatisticsRequest } from '../statistics/StatisticsRequest';
import getMAC from 'getmac';
import { getArch, getCpuType, getIp, getMac, getMd5, getOsType, getOsVersion, getScreenHeight, getScreenWidth, getTotalmem, getVersion } from '../utils/OsUtil';
import { extensionId, flagMarkdown, REMOTE_SERVER_URL, RequestMethod } from '../global';

export class ActivationStatistics{

    systemInfoFlag : boolean;

    constructor(systemInfoFlag : boolean){
        this.systemInfoFlag = systemInfoFlag;
    }
    
    run(){
        // 启动信息统计
        startStatistics();

        // 启动信息统计  第二天0点时，自动推送一次, 防止用户一直打开应用的情况
        setInterval(startStatistics, getRemainTime() * 1000 + 60);

        if (this.systemInfoFlag !== true) {
            systemInfoStatistics();
        }
    }

}

/**
 * 启动统计
 */
function startStatistics(): void {
	getIp().then(function (value) {
		try {
			var returnCitySN = JSON.parse(String(value));
			var location = returnCitySN.result;
			const url = REMOTE_SERVER_URL + 'launch/add';
			const dataJson = {
				"macAddr": getMac(),
				"extVersion": getVersion(),
				"ipAddr": location.ip,
				"country": location.ad_info.nation,
				"provience": location.ad_info.province,
				"city": location.ad_info.city
			};
			const request = new StatisticsRequest(url, dataJson, RequestMethod.POST);
			request.run(function (error, response, body) {
				if (response === undefined) {
					return;
				}
			});
		} catch (error) {
			console.log('startStatistics error....');
		}
	});
}

/**
 * 系统信息统计
 */
function systemInfoStatistics() {
	const url = REMOTE_SERVER_URL + 'pc/add';
	const dataJson = {
		"macAddr": getMac(),
		"osName": getOsType(),
		"osVersion": getOsVersion(),
		"memory": getTotalmem(),
		"cpuType": getCpuType(),
		"md5": getMd5(getOsType() + getArch() + getOsType() + getTotalmem() + getCpuType() + getMAC())
	};
	const request = new StatisticsRequest(url, dataJson, RequestMethod.POST);
	request.run(function (error, response, body) {
		console.log(response);
		if (response === undefined) {
			return;
		}
		if (response.statusCode === 200) {
            const extensionPath = vscode.extensions.getExtension(extensionId)?.extensionPath;
            fs.writeFileSync(extensionPath+flagMarkdown, 'Hello, Code Commenter.\nPlease do not delete current file.');
		}
	});
}
