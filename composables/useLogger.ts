export const useLogger = (id: string) => {
  // TODO handle toggle logger and another methods mapped, or library specific
  return {
    log(...msg: any) {
      console.log(`[${id}]`,...msg)
    }
  }
}
