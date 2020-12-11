export default function checkIsLogin ({ $auth, redirect }) {
  const authUser = $auth.$storage.getCookie('authUser')
  if (!authUser) {
    return redirect('/')
  }
  const now = new Date()
  if (now.getTime() > authUser.expires_in) {
    $auth.$storage.setCookie('authUser', null)
    return redirect('/')
  }
  redirect('/account')
}
