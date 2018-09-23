<template>
  <v-content>
    <v-toolbar
      dark
      color="red"
    >
      <v-toolbar-title class="white--text">
        Youtube comments downloader
      </v-toolbar-title>
    </v-toolbar>
    <v-container grid-list-xl>
      <v-layout>
        <v-flex
          xs12
          md8
          offset-md2
        >
          <yt-form />
          <yt-comment-list />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import * as VGrid from 'vuetify/es5/components/VGrid'
  import * as VToolbar from 'vuetify/es5/components/VToolbar'

  import YtForm from '@/components/YtForm'
  import YtCommentList from '@/components/YtCommentList'

  export default {
    components: {
      ...VGrid,
      ...VToolbar,
      YtCommentList,
      YtForm
    }
  }
</script>
