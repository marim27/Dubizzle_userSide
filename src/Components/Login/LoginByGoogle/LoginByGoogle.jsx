const LoginByGoogle =()=>{
  
  const signIn = () => {
    let oauth = "https://accounts.google.com/o/oauth2/v2/auth";
    let form = document.createElement("form");
    form.setAttribute("method", "get");
    form.setAttribute("action", oauth);

    let params = {
      client_id:
        "334099612862-irg4t3m46pldegmc0jtg9nlccp8s98sa.apps.googleusercontent.com",
      redirect_uri: "http://localhost:5173",
      response_type: "token",
      scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      include_granted_scopes: "true",
      state: "pass-through-value",
    };

    for (var p in params) {
      let input = document.createElement("input");
      input.setAttribute("type", "hidden"); 
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <button className="btn-login" onClick={signIn}>
        <img src="../../svg/google.svg" alt="" className="me-2" />
        Continue with Google
      </button>
    </>
  );
}

export default LoginByGoogle;
