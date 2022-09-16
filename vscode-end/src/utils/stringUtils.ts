

/**
 * 获取路径的最后一个字符串
 * @param path 
 * @returns 
 */
export function splitPathLast(path : string) : string{
   var args = path.split('/');
   return args[args.length-1];
}