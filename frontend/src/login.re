type state = {
    login: string,
    password: string
};

type action =
    | SetLogin(string)
    | SetPassword(string);


let component = ReasonReact.reducerComponent("Login");

let make = (_children) => {
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
                onChange={ev => self.send(SetLogin(ReactDOMRe.domElementToObj(ReactEventRe.Form.target(ev))##value))}
            />
            (ReasonReact.string("password"))
            <input
                value=self.state.password
                _type="password"
                onChange={ev => self.send(SetPassword(ReactDOMRe.domElementToObj(ReactEventRe.Form.target(ev))##value))}
            />

        </div>
};
