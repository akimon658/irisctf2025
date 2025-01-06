const issuer = "https://close-badger-22.deno.dev"

Deno.serve((req) => {
  const reqUrl = new URL(req.url)

  if (reqUrl.pathname === "/.well-known/openid-configuration") {
    return Response.json({
      issuer: issuer,
      authorization_endpoint: issuer + "/auth",
      token_endpoint: issuer + "/token",
      userinfo_endpoint: issuer + "/userinfo",
    })
  }

  if (reqUrl.pathname === "/auth") {
    const redirectUri = reqUrl.searchParams.get("redirect_uri")
    const state = reqUrl.searchParams.get("state")

    if (!redirectUri) {
      return new Response("redirect_uri is required", { status: 400 })
    }

    return Response.redirect(redirectUri + "?state=" + state)
  }

  if (reqUrl.pathname === "/token") {
    return Response.json({
      access_token: "token",
      token_type: "Bearer",
    })
  }

  if (reqUrl.pathname === "/userinfo") {
    return Response.json({
      sub: "..flag",
    })
  }

  return new Response("Not Found", { status: 404 })
})
