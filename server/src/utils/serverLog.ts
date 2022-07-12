export default (method: string, message: string, defaultId?: string, accountId?: string) => {
    const time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let hasDefaultOrUser = defaultId && accountId ? `\u001b[1;35m[X: ${defaultId} | U: ${accountId}] ` : ''

    return console.log(`\u001b[1;36m${time} >> \u001b[1;34m[${method}] ${hasDefaultOrUser}\u001b[1;37m${message}`)
}
