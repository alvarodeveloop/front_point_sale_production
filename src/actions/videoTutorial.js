export const setVideos = data => {
  return {
    type: 'set',
    data
  }
}

export const cleanVideos = () => {
  return {
    type: 'clean',
  }
}
