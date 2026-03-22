import readline from 'node:readline'
import { CYAN, DIM, GREEN, NC } from './utilities.js'

function cancel() {
  process.stdout.write('\n')
  console.log(`  ${DIM}■${NC} Setup cancelled.`)
  // eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit -- CLI cancellation requires explicit exit
  process.exit(0)
}

function clearLines(count) {
  for (let index = 0; index < count; index++) {
    process.stdout.write('\u001B[1A\u001B[2K')
  }
}

export function select(message, options) {
  return new Promise(resolve => {
    let cursor = 0

    function render() {
      const lines = [`  ◆ ${message}`]
      for (const [index, option] of options.entries()) {
        const selected = index === cursor
        const icon = selected ? '●' : '○'
        const color = selected ? CYAN : ''
        const reset = selected ? NC : ''
        lines.push(`  │  ${color}${icon} ${option.label}${reset}`)
      }
      lines.push('  └')
      process.stdout.write(`${lines.join('\n')}\n`)
    }

    render()

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    const onData = key => {
      switch (key) {
        case '\r': {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdin.removeListener('data', onData)

          clearLines(options.length + 2)
          console.log(`  ${GREEN}◆${NC} ${message}: ${GREEN}${options[cursor].label}${NC}`)

          resolve(options[cursor].value)
          return
        }
        case '\u0003': {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdin.removeListener('data', onData)
          cancel()
          return
        }
        case '\u001B[A':
        case 'k': {
          cursor = cursor > 0 ? cursor - 1 : options.length - 1
          break
        }
        case '\u001B[B':
        case 'j': {
          cursor = cursor < options.length - 1 ? cursor + 1 : 0
          break
        }
        default: {
          break
        }
      }

      clearLines(options.length + 2)
      render()
    }

    process.stdin.on('data', onData)
  })
}

export function multiselect(message, options, config = {}) {
  return new Promise(resolve => {
    let cursor = 0
    const selected = new Set(config.defaults || [])

    function render() {
      const hint = `${DIM}(space to toggle, enter to confirm)${NC}`
      const lines = [`  ◆ ${message} ${hint}`]
      for (const [index, option] of options.entries()) {
        const isCursor = index === cursor
        const isSelected = selected.has(option.value)
        const icon = isSelected ? '◼' : '◻'
        const color = isCursor ? CYAN : ''
        const reset = isCursor ? NC : ''
        const hintText = option.hint ? ` ${DIM}${option.hint}${NC}` : ''
        lines.push(`  │  ${color}${icon} ${option.label}${reset}${hintText}`)
      }
      lines.push('  └')
      process.stdout.write(`${lines.join('\n')}\n`)
    }

    render()

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    const onData = key => {
      switch (key) {
        case ' ': {
          if (selected.has(options[cursor].value)) {
            selected.delete(options[cursor].value)
          } else {
            selected.add(options[cursor].value)
          }
          break
        }
        case '\r': {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdin.removeListener('data', onData)

          clearLines(options.length + 2)
          const selectedLabels = options
            .filter(option => selected.has(option.value))
            .map(option => option.label)
            .join(', ')
          console.log(`  ${GREEN}◆${NC} ${message}: ${GREEN}${selectedLabels || 'none'}${NC}`)

          resolve(options.filter(option => selected.has(option.value)).map(option => option.value))
          return
        }
        case '\u0003': {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdin.removeListener('data', onData)
          cancel()
          return
        }
        case '\u001B[A':
        case 'k': {
          cursor = cursor > 0 ? cursor - 1 : options.length - 1
          break
        }
        case '\u001B[B':
        case 'j': {
          cursor = cursor < options.length - 1 ? cursor + 1 : 0
          break
        }
        default: {
          break
        }
      }

      clearLines(options.length + 2)
      render()
    }

    process.stdin.on('data', onData)
  })
}

export function groupMultiselect(message, groups, config = {}) {
  return new Promise(resolve => {
    const items = []

    for (const [groupName, groupOptions] of Object.entries(groups)) {
      items.push({ isHeader: true, label: groupName })
      for (const option of groupOptions) {
        items.push({ ...option, isHeader: false })
      }
    }

    const selectableIndices = items
      .map((item, index) => (item.isHeader ? -1 : index))
      .filter(index => index !== -1)

    let cursorPos = 0
    let cursor = selectableIndices[0]
    const selected = new Set(config.defaults || [])

    function render() {
      const hint = `${DIM}(space to toggle, enter to confirm)${NC}`
      const lines = [`  ◆ ${message} ${hint}`]
      for (const [index, item] of items.entries()) {
        if (item.isHeader) {
          lines.push('  │', `  │  ${item.label}`)
          continue
        }

        const isCursor = index === cursor
        const isSelected = item.fixed || selected.has(item.value)
        const icon = isSelected ? '◼' : '◻'
        const color = isCursor ? CYAN : ''
        const reset = isCursor ? NC : ''
        lines.push(`  │  ${color}${icon} ${item.label}${reset}`)
      }
      lines.push('  └')
      process.stdout.write(`${lines.join('\n')}\n`)
    }

    render()

    const totalRenderLines = () => {
      let count = 2
      for (const item of items) {
        count += item.isHeader ? 2 : 1
      }
      return count
    }

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    const onData = key => {
      switch (key) {
        case ' ': {
          const item = items[cursor]
          if (!item.fixed) {
            if (selected.has(item.value)) {
              selected.delete(item.value)
            } else {
              selected.add(item.value)
            }
          }
          break
        }
        case '\r': {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdin.removeListener('data', onData)

          clearLines(totalRenderLines())
          const allSelected = items
            .filter(item => !item.isHeader && (item.fixed || selected.has(item.value)))
            .map(item => item.label)
            .join(', ')
          console.log(`  ${GREEN}◆${NC} ${message}: ${GREEN}${allSelected}${NC}`)

          resolve(
            items
              .filter(item => !item.isHeader && (item.fixed || selected.has(item.value)))
              .map(item => item.value)
          )
          return
        }
        case '\u0003': {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdin.removeListener('data', onData)
          cancel()
          return
        }
        case '\u001B[A':
        case 'k': {
          cursorPos = cursorPos > 0 ? cursorPos - 1 : selectableIndices.length - 1
          cursor = selectableIndices[cursorPos]
          break
        }
        case '\u001B[B':
        case 'j': {
          cursorPos = cursorPos < selectableIndices.length - 1 ? cursorPos + 1 : 0
          cursor = selectableIndices[cursorPos]
          break
        }
        default: {
          break
        }
      }

      clearLines(totalRenderLines())
      render()
    }

    process.stdin.on('data', onData)
  })
}

export function confirm(message, defaultValue = true) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    const hint = defaultValue ? '[Y/n]' : '[y/N]'

    rl.question(`  ◆ ${message} ${DIM}${hint}${NC} `, answer => {
      rl.close()
      const trimmed = answer.trim().toLowerCase()

      const result = trimmed === '' ? defaultValue : trimmed === 'y' || trimmed === 'yes'

      clearLines(1)
      const display = result ? 'Yes' : 'No'
      console.log(`  ${GREEN}◆${NC} ${message}: ${GREEN}${display}${NC}`)

      resolve(result)
    })

    rl.on('close', () => {
      if (!rl.closed) cancel()
    })
  })
}

export function spinner() {
  const frames = ['◐', '◓', '◑', '◒']
  let interval
  let frameIndex = 0
  let startTime

  return {
    start(message) {
      startTime = Date.now()
      frameIndex = 0
      process.stdout.write(`  ${frames[0]} ${message}`)

      interval = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length
        const elapsed = Math.round((Date.now() - startTime) / 1000)
        process.stdout.write(`\r  ${frames[frameIndex]} ${message} ${DIM}(${elapsed}s)${NC}`)
      }, 80)
    },

    stop(message) {
      clearInterval(interval)
      const elapsed = Math.round((Date.now() - startTime) / 1000)
      process.stdout.write(`\r\u001B[2K  ${GREEN}✓${NC} ${message} ${DIM}(${elapsed}s)${NC}\n`)
    }
  }
}
