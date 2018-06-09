type state = {
    login: string,
    password: string
};

type action =
    | SetLogin(string)
    | SetPassword(string);


let component = ReasonReact.reducerComponent("Login");

let make = (_children) => {
    let setLogin = (event, self) => {
        Js.log(ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value);
      };
  {
    ...component,
    initialState: ()=> { login: "", password: "" },

    reducer: (action, state) =>
        switch (action) {
        | SetLogin (data) => ReasonReact.Update({...state, login: data })
        | SetPassword (data) => ReasonReact.Update({...state, password: data })
        },

    render: self =>
        <div>
            (ReasonReact.string("login"))
            <input
                value=self.state.login
                onClick={self.handle(setLogin)}
            />
            (ReasonReact.string("Login here"))
        </div>
    }
};
