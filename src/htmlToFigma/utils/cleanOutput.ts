export function cleanOutput(output: any) {
  const handleNode = (data: any) => {
    if (!data) {
      return
    }

    if (data.metadata) {
      delete data.metadata
    }

    if (data.children) {
      for (const c of data.children) {
        handleNode(c)
      }
    }
  }

  handleNode(output)
}
