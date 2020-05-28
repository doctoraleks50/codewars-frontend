<template>
  <div ref="editor"></div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

export default {
  name: 'editor',
  props: {
    value: String
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        syntax: true
      },
      theme: 'snow'
    })
    this.editor.root.innerHTML = this.value
    this.editor.on('text-change', () => {
      this.$emit(
        'input',
        this.editor.getText() ? this.editor.root.innerHTML : ''
      )
    })
  },
  watch: {
    value () {
      if (this.editor.root.innerHTML !== this.value) {
        this.editor.root.innerHTML = this.value
      }
    }
  }
}
</script>
