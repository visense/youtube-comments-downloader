import request from '../api'

export default {
  async getVideo (context) {
    const url = new URL(context.state.api.url + 'videos')
    const params = {
      key: context.state.api.key,
      id: context.state.videoId,
      part: 'snippet,statistics'
    }

    const response = await request(url, params)
    context.commit('video', response.items[0])
  },
  async getCommentThreads (context, pageToken) {
    const url = new URL(context.state.api.url + 'commentThreads')
    const params = {
      key: context.state.api.key,
      videoId: context.state.videoId,
      part: 'snippet,replies',
      maxResults: 100
    }

    if (pageToken) {
      params.pageToken = pageToken
    }

    try {
      const response = await request(url, params)

      response.items.forEach(comment => {
        context.commit('comment', comment)
      })

      const promises = []

      promises.push(
        ...response.items
          .filter(comment => comment.snippet.totalReplyCount > 0)
          .map(comment => context.dispatch('getComments', comment.snippet.topLevelComment.id))
      )

      if (response.nextPageToken) {
        promises.push(context.dispatch('getCommentThreads', response.nextPageToken))
      }

      await Promise.all(promises)
    } catch (error) {
      context.state.error = {
        videoId: params.videoId,
        pageToken: pageToken || false,
        ...error
      }
    }
  },
  async getComments (context, commentId, pageToken) {
    const url = new URL(context.state.api.url + 'comments')
    const params = {
      key: context.state.api.key,
      parentId: commentId,
      part: 'snippet',
      maxResults: 100
    }

    if (pageToken) {
      params.pageToken = pageToken
    }

    try {
      const response = await request(url, params)

      response.items.forEach(reply => {
        context.commit('commentReply', { commentId, reply })
      })

      if (response.nextPageToken) {
        await context.dispatch('getComments', response.nextPageToken)
      }
    } catch (error) {
      context.state.error = {
        videoId: params.videoId,
        commentId,
        pageToken: pageToken || false,
        ...error
      }
    }
  }
}
