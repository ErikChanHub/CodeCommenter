/**
 * 
 * @returns yyyy-MM-dd
 */
export function getCurentTime() {
    let now = new Date();

    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日
    let clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    return (clock);
}
/**
 * 
 * @returns 时间戳
 */
export function getTimestamp() {
    let date = new Date();
    return Math.trunc(date.getTime() / 1000);
}
/**
 * 
 * @returns 一天中剩余的秒数
 */
export function getRemainTime() {
    let now = new Date();
    let timestamp = getTimestamp();
    let daySecond = 86400;
    return daySecond - (timestamp % daySecond + 28800);

}
