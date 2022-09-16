/*
 * Filename            :       OsUtil.ts
 * Author              :       Erik Chan
 * Data                :       2021-11-08
 * Version             :       0.1
 * Description         :       操作系统助手
 * Change Logs:
 * Date           Author       Notes
 * 2021/11/08     Erik Chan    实现 获取当前操作系统的类型
 */

import os = require('os');
import * as vscode from 'vscode';
import getMAC, { isMAC } from 'getmac';
import { extensionId } from '../global';

export const enum OsType {
    macOS = 'macOS',
    linux = 'linux',
    windows = 'windows'
}

/**
 * 获取当前操作系统类型
 * @returns OsType
 */
export function getOsType(): OsType {
    const platform = os.platform();
    let osType = OsType.windows;
    switch (platform) {
      case 'darwin':
        osType = OsType.macOS;
        break;
      case 'linux':
        osType = OsType.linux;
        break;
      case 'win32':
        osType = OsType.windows;
        break;
    }
    return osType;
  }

  export function getOsVersion(): string {
    return os.release();
  }
  
  export function getOsCpus(): number {
    return os.cpus().length;
  }
  
  export function getCpuType(): string {
    return os.cpus()[0].model;
  }
  export function getArch(): string {
    return os.arch();
  }
  
  export function getTotalmem(): string {
    return (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
  }
  
  export function getIp() {
    return new Promise(function (resolve, reject) {
      const request = require('request');
      request({
        url: "https://apis.map.qq.com/ws/location/v1/ip",
        method: "GET",
        qs: {
          "key": "KYXBZ-WMXK3-PHT3R-3NCF4-AWGSF-GCBMG"
        }
      }, function (error, response, body) {
        if (response.statusCode === 200) {
          resolve(body);
        }
      });
    });
  }
  
  export function getMac() {
    const osType = getOsType();
    var networkInterfaces = os.networkInterfaces();
    if (osType === OsType.windows) {
      return getMAC();
    } else if (osType === OsType.linux) {
      return networkInterfaces['ens33'][1].mac;
    } else if (osType === OsType.macOS) {
      return networkInterfaces['en0'][0].mac;
    }
  }
  
  
  export function getScreenWidth() {
    return "";
  }
  
  export function getScreenHeight() {
    return "";
  }
  
  export function getMd5(str: string) {
    var md5 = require('md5-node');
    return md5(str);
  }

  export function getVersion() {
    const fs = require('fs');
    const packagePath = vscode.extensions.getExtension(extensionId)?.extensionPath + '/package.json';
    let rawdata = fs.readFileSync(packagePath);
    let packageJson = JSON.parse(rawdata);
    return packageJson.version;
  }
  