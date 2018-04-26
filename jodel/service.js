const isFavourite = async (post, user) => {
  const favs = await post.getFavouriteUser()
  for (let i = 0, len = favs.length; i < len; i++) {
    if (favs[i].id === user.id) {
      return true
    }
  }
  return false
}

module.exports = {
  isFavourite
}
