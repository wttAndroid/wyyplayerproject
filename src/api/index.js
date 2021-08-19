import {
  request
} from './axios'
export const getBanner = type => {
  return request.get(`/banner?type=${type}`)
}
export const getPersonalized = (limit = 10) => {
  return request.get(`/personalized?limit=${limit}`)
}
export const getPersonalizedzxyy = () => {
  return request.get(`/personalized/newsong`)
}
export const getSong = id => {
  return request.get(`/song/url?id=${id}`)
}
export const getFindMy = () => {
  return request.get(`/personalized/mv`)
}
//获取歌单分类
export const getRecomCatelist = () => {
  return request.get(`/playlist/hot`)
}
export const getRecomJpgd = (cat = '全部') => {
  // return request.get(`/top/playlist/highquality?cat=&before=1503639064232&limit=3`)
  return request.get(`/top/playlist/highquality?cat=${cat}`)
}
export const getRecomPlaylist = (cat = '全部', offset = 0, order, limit = 10) => {

  offset = (offset - 1) * limit;
  return request.get(`/top/playlist?cat=${cat}&limit=${limit}&order=${order}&offset=${offset}`)
}
export const getNewsongList = (type = 0) => {
  return request.get(`/top/song?type=${type}`)
}
export const getNewmvList = (area, type, order, offset = 0, limit = 8) => {

  offset = (offset - 1) * limit
  console.log(area, type, order, offset);
  return request.get(`/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`)
}
//获取歌单详情
export const getplaylist = (id) => {
  return request.get(`playlist/detail?id=${id}`)
}
//获取歌曲的详情  多个id用，隔开
export const getSongDefalt = (ids) => {
  return request.get(`/song/detail?ids=${ids}`)
}

//获取歌单评论 /comment/playlist?id=705123491
export const getCommentList = (id, offset = 1, limit = 20) => {
  offset = (offset - 1) * 20
  return request.get(`/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`)
}

//获取MV详情 地址
export const getInfomv = (mvid) => {
  return request.get(`/mv/detail?mvid=${mvid}`)
}
export const getInfomvurl = (mvid) => {
  return request.get(`/mv/url?id=${mvid}`)
}
//获取Mv评价
export const getInfomvComent = (id, offset = 1, limit = 10) => {
  offset = (offset - 1) * limit
  return request.get(`/comment/mv?id=${id}&offset=${offset}&limit=${limit}`)
}
//相关mv
export const getSimimvList = (mvid) => {
  return request.get(`/simi/mv?mvid=${mvid}`)
}
//获取搜索 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频,
export const getSeacth = (keywords, type = 1, offset = 1, limit = 10) => {
  offset = (offset - 1) * limit
  return request.get(`/search?keywords= ${keywords}&type=${type}&offset=${offset}&limit=${limit}`)
}
