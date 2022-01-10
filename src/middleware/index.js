import common from './common'
import user from './user'
import chat from './chat'

function doUseRouterMiddleware() {
  common.useRouteMiddleware()
  user.useRouteMiddleware()
  chat.useRouteMiddleware()
}

export default {
  doUseRouterMiddleware
}
