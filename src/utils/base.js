export function formatDate(time) {
  let date = new Date(time)
  let y = date.getFullYear()
  y = y < 10 ? '0' + y : y;
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m;
  let d = date.getDate()
  d = d < 10 ? '0' + d : d;
  let h = date.getHours()
  h = h < 10 ? '0' + h : h;
  let MM = date.getMinutes()
  MM = MM < 10 ? '0' + MM : MM;
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s;
  // console.log(y, m, d, h, MM, s)
  return y + '-' + m + '-' + d + '  ' + h + ':' + MM + ':' + s;
}

export function createSong(song) {
  const {
    id,
    name,
    artists,
    duration,
    mvId,
    album,
    ...rest
  } = song
  return {
    id,
    name,
    artists,
    album,
    duration,
    ...rest
  }
}
// import {getSong } from '@/api'
//  async function getSongUrl (id) { 
//    return await getSong(id);
// }
