<template>
    <div ref="editor"></div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/javascript/javascript'

export default {
  props: {
    value: String,
    height: String
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = CodeMirror(this.$refs.editor, {
      theme: 'darcula',
      lineNumbers: true
    })
    this.editor.setValue(this.value)
    this.editor.setSize('100%', this.height)
    this.editor.on('change', () => {
      this.$emit(
        'input',
        this.editor.getValue()
      )
    })
  },
  watch: {
    value () {
      if (this.editor.getValue() !== this.value) {
        this.editor.setValue(this.value)
      }
    }
  }
}
</script>
