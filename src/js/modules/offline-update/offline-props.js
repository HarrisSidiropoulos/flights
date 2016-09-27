const offlineProps = (env=process.env.NODE_ENV)=> {
  let {install, applyUpdate} = {
    install : ()=>{},
    applyUpdate : ()=>{},
    env
  }
  if (env==="production") {
    install = require('offline-plugin/runtime').install
    applyUpdate = require('offline-plugin/runtime').applyUpdate
  }
  return {
    install,
    applyUpdate,
    NODE_ENV: process.env.NODE_ENV
  }
}
export default offlineProps
